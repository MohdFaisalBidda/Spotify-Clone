import SpotifyWebApi from "spotify-web-api-node"

const scopes =[
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "streaming",
    "user-read-private",
    "user-library-read",
    "user-top-read",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-follow-read"
].join(",");

const params ={
    scope: scopes
}

const queryParamsString =new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamsString.toString()}`;

const spotifyApi = new SpotifyWebApi({
    clientId:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET
})
// console.log(spotifyApi)

export default spotifyApi;

export {LOGIN_URL};