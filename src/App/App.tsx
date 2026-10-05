import {useState} from 'react';
import styles from './App.module.css';
import SearchBar from '../components/SearchBar/SearchBar';
import SearchResults from '../components/SearchResults/SearchResults';
import Playlist from '../components/Playlist/Playlist';

const tracks = [
  { name: 'Track 1', artist: 'Artist 1', album: 'Album 1', id: '1' },
  { name: 'Track 2', artist: 'Artist 2', album: 'Album 2', id: '2' },
  { name: 'Track 3', artist: 'Artist 3', album: 'Album 3', id: '3' },
];
const playlist: { name: string; artist: string; album: string; id: string }[] = [];

function App() {
  const [searchResults, setSearchResults] = useState(tracks)
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playListTracks, setPlayListTracks] = useState(playlist); 

  const handleSearch = (query: string) => {
    const normalizedQuery = query.trim().toLowerCase();
    setSearchResults(
      tracks.filter((track) =>
        `${track.name} ${track.artist} ${track.album}`
          .toLowerCase()
          .includes(normalizedQuery),
      ),
    );
  };
  const handlePlaylistNameChange = (name: string) => {
    setPlaylistName(name);
  };
  const handleAddTrack = (track: any) => {
    setPlayListTracks((prevTracks) => [...prevTracks, track]);
  };
  const handleRemoveTrack = (track: any) => {
    setPlayListTracks((prevTracks) => {
      const trackIndex = prevTracks.findIndex((item) => item.id === track.id);
      return prevTracks.filter((_, index) => index !== trackIndex);
    });
  };
  return (
    <main className={styles.app}>
      <h1>Jammming</h1>
      <div className={styles.workspace}>
        <SearchBar onSearch={handleSearch} />
        <SearchResults searchResults={searchResults} handleAddTrack={handleAddTrack} />
        <Playlist playlistName={playlistName} onPlaylistNameChange={handlePlaylistNameChange} playListTracks={playListTracks} handleRemoveTrack={handleRemoveTrack} />
      </div>
    </main>
  )
}

export default App
