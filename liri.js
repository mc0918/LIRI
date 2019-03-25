// Requires .env file
require("dotenv").config();
var SpotifyAPI = require("spotify-web-api-node");

//Require keys file for API keys and save to variable
var keys = require("./keys");

// Access Spotify keys
var spotify = new SpotifyAPI(keys.spotify);

console.log(spotify);

//Take in user input, get rid of index 0 and 1
const arg = process.argv;
var userInput = arg.slice(2);
console.log(userInput);
