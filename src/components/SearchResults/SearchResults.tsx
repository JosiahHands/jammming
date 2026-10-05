import TrackList from "../TrackList/TrackList";
function SearchResults(props: any) {
    return (
        <div>
            <h2>Search Results</h2>
            <TrackList tracks={props.searchResults} add={true}/>
        </div>
    )
}
export default SearchResults;