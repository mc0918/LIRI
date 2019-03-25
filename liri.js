// Requires .env file
require("dotenv").config();
var SpotifyAPI = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");

//Require keys file for API keys and save to variable
var keys = require("./keys");

// Access Spotify keys
var spotify = new SpotifyAPI(keys.spotify);

console.log(spotify);

//Take in user input, get rid of index 0 and 1
const arg = process.argv;
var userInput = arg.slice(2);
console.log(userInput);

//Use user input to search spotify
spotify
  .search({ type: "track", query: userInput })
  .then(function(response) {
    console.log(response.tracks.items[0]);
  })
  .catch(function(err) {
    console.log(err);
  });
