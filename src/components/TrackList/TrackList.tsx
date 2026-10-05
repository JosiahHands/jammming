import Track from "../Track/Track";
function TrackList(props: any) {
    return (
        <div>
            {
                props.tracks.map((track: any, index: number) => (
                    <div key={`${track.id}-${index}`}>
                        <Track id={track.id} name={track.name} artist={track.artist} album={track.album} />
                        <button onClick={() => props.handleClick(track)}>{props.add === true ? '+' : '-'}</button>
                    </div>
                ))
            }
        </div>
    );
};

export default TrackList;