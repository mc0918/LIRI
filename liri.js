// Requires .env file
require("dotenv").config();
var SpotifyAPI = require("spotify-web-api-node");

//Require keys file for API keys and save to variable
var keys = require("./keys");

// Access Spotify keys
var spotify = new SpotifyAPI(keys.spotify);

console.log(spotify);
