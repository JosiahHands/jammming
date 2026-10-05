
const clientId = '';
const redirectUri = 'http://127.0.0.1:5173/';
let accessToken: string | null = null;
const codeChallenge = '';
const Spotify = {
    getAccessToken: () => {
        if (accessToken) {
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', '', '/');
            return accessToken;

        } else {
            const params = new URLSearchParams({
            client_id: clientId,
            response_type: 'code',
            scope: 'playlist-modify-public',
            redirect_uri: redirectUri,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
        });
        window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
        }   
    },
    search(term: string) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsoneResponse => {
            if (!jsoneResponse.tracks) {
                return [];
            }
            return jsoneResponse.tracks.items.map((track: any) => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        })
    }
}
export default Spotify;