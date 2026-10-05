import styles from './Playlist.module.css';
import TrackList from '../TrackList/TrackList';
function Playlist(props: { playlistName: string; onPlaylistNameChange: (name: string) => void; playListTracks: any[] }) {
  return (
    <div className={styles.playlist}>
      <input value={props.playlistName} onChange={(e) => props.onPlaylistNameChange(e.target.value)} /> 
      <TrackList tracks={props.playListTracks} onAddTrack={() => {}} add={false}/>
      <button>Save to Spotify</button>
    </div>
  );
};

export default Playlist;