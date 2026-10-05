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

function App() {
  const [searchResults, setSearchResults] = useState(tracks)
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playListTracks] = useState(tracks); 

  function handleSearch(query: string) {
    const normalizedQuery = query.trim().toLowerCase();
    setSearchResults(
      tracks.filter((track) =>
        `${track.name} ${track.artist} ${track.album}`
          .toLowerCase()
          .includes(normalizedQuery),
      ),
    );
  }
  function handlePlaylistNameChange(name: string) {
    setPlaylistName(name);
  }
  return (
    <main className={styles.app}>
      <h1>Jammming</h1>
      <div className={styles.workspace}>
        <SearchBar onSearch={handleSearch} />
        <SearchResults searchResults={searchResults} />
        <Playlist playlistName={playlistName} onPlaylistNameChange={handlePlaylistNameChange} playListTracks={playListTracks}/>
      </div>
    </main>
  )
}

export default App
