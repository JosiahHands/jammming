import styles from './App.module.css';
import SearchBar from '../components/SearchBar/SearchBar';
import SearchResults from '../components/SearchResults/SearchResults';
import Playlist from '../components/Playlist/Playlist';
import TrackList from '../components/TrackList/TrackList';
import Track from '../components/Track/Track';
function App() {

  return (
    <main className={styles.app}>
      <h1>Jammming</h1>
      <div className={styles.workspace}>
        <SearchBar />
        <SearchResults />
        <Playlist />
        <TrackList />
        <Track />
      </div>
    </main>
  )
}

export default App
