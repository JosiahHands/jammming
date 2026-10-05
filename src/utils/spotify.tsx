const clientId = '';
const redirectUri = 'http://127.0.0.1:5173/';
let accessToken: string | null = null;

const generateRandomString = (length: number) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], '');
};

const sha256 = async (plain: string) => {
  const data = new TextEncoder().encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
};

const base64encode = (input: ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

const Spotify = {
  getAccessToken: async () => {
    if (accessToken) {
      return accessToken;
    }

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      const codeVerifier = window.localStorage.getItem('code_verifier');
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: clientId,
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier ?? '',
        }),
      });
      const json = await response.json();

      if (!response.ok || !json.access_token) {
        console.error('Spotify token exchange failed', json);
        return null;
      }

      accessToken = json.access_token;
      const expiresIn = Number(json.expires_in);
      window.setTimeout(() => {
        accessToken = null;
      }, expiresIn * 1000);
      window.localStorage.removeItem('code_verifier');
      window.history.replaceState({}, '', '/');
      return accessToken;
    }

    const codeVerifier = generateRandomString(64);
    window.localStorage.setItem('code_verifier', codeVerifier);
    const codeChallenge = base64encode(await sha256(codeVerifier));
    const authParams = new URLSearchParams({
      client_id: clientId,
      response_type: 'code',
      scope: 'playlist-modify-public',
      redirect_uri: redirectUri,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
    });
    window.location.href = `https://accounts.spotify.com/authorize?${authParams.toString()}`;
    return null;
  },
  async search(term: string) {
    const token = await Spotify.getAccessToken();
    if (!token) {
      return [];
    }
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((track: any) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      });
  },
};

export default Spotify;
