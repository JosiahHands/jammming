function Track(props: {id: string, name: string, artist: string, album: string}) {
  return (
    <div>
      <h3>{props.name}</h3>
      <p>{props.artist} | {props.album}</p>
    </div>
  );
};

export default Track;