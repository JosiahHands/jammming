import Track from "../Track/Track";
function TrackList(props: any) {
    return (
        <div>
            {
                props.tracks.map((track: any) => (
                    <div>
                        <Track key={track.id} id={track.id} name={track.name} artist={track.artist} album={track.album} />
                        <button onClick={props.handleClick}>{props.add === true ? '+' : '-'}</button>
                    </div>
                ))
            }
        </div>
    );
};

export default TrackList;