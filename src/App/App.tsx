import {useState} from 'react';
import styles from './App.module.css';
import SearchBar from '../components/SearchBar/SearchBar';
import SearchResults from '../components/SearchResults/SearchResults';
import Playlist from '../components/Playlist/Playlist';
import Spotify from '../utils/spotify';
const playlist: { name: string; artist: string; album: string; id: string; uri: string }[] = [];



function App() {
  const [searchResults, setSearchResults] = useState([])
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playListTracks, setPlayListTracks] = useState(playlist); 

  const handleSearch = (query: string) => {
    Spotify.search(query).then(searchResults => {
      setSearchResults(searchResults);
    });
  };
  const handlePlaylistNameChange = (name: string) => {
    setPlaylistName(name);
  };
  const handleAddTrack = (track: any) => {
    setPlayListTracks((prevTracks) => {
      if (prevTracks.some((t) => t.id === track.id)) {
        return prevTracks;
      }
      return [...prevTracks, track];
    });
  };
  const handleRemoveTrack = (track: any) => {
    setPlayListTracks((prevTracks) => {
      const trackIndex = prevTracks.findIndex((item) => item.id === track.id);
      return prevTracks.filter((_, index) => index !== trackIndex);
    });
  };
  const savePlaylist = () => {
    const trackUris = playListTracks.map(track => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName('New Playlist');
      setPlayListTracks([]);
    });
  };
  return (
    <main className={styles.app}>
      <h1>Jammming</h1>
      <div className={styles.workspace}>
        <SearchBar onSearch={handleSearch} />
        <SearchResults searchResults={searchResults} handleAddTrack={handleAddTrack} />
        <Playlist 
          playlistName={playlistName} 
          onPlaylistNameChange={handlePlaylistNameChange} 
          playListTracks={playListTracks}  
          handleRemoveTrack={handleRemoveTrack}
          savePlaylist={savePlaylist} />
      </div>
    </main>
  )
}

export default App
