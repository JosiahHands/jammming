import {useState} from 'react';
import styles from './App.module.css';
import SearchBar from '../components/SearchBar/SearchBar';
import SearchResults from '../components/SearchResults/SearchResults';
import Playlist from '../components/Playlist/Playlist';
import Spotify from '../utils/spotify';
const tracks = [
  { name: 'Track 1', artist: 'Artist 1', album: 'Album 1', id: '1', uri: 'uri1' },
  { name: 'Track 2', artist: 'Artist 2', album: 'Album 2', id: '2', uri: 'uri2' },
  { name: 'Track 3', artist: 'Artist 3', album: 'Album 3', id: '3', uri: 'uri3' },
];
const playlist: { name: string; artist: string; album: string; id: string; uri: string }[] = [];



function App() {
  const [searchResults, setSearchResults] = useState(tracks)
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
    console.log(playlistName, trackUris);
    setPlaylistName('New Playlist');
    setPlayListTracks([]);
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
