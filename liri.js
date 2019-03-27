// Requires .env file
require("dotenv").config();
var SpotifyAPI = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var inquirer = require("inquirer");

//Require keys file for API keys and save to variable
var keys = require("./keys");

// Access Spotify keys
var spotify = new SpotifyAPI(keys.spotify);

console.log(spotify);

//Take in user input, get rid of index 0 and 1
const arg = process.argv;
var userInput = arg.slice(2);
console.log(userInput);

if (process.argv.length === 2) {
  userInput = "The Sign";
}

//Use user input to search spotify
spotify
  .search({ type: "track", query: userInput })
  .then(function(response) {
    console.log(response.tracks);
    console.log("-----------");
    console.log(
      "Artist: " +
        response.tracks.items[0].artists[0].name +
        "\nSong: " +
        response.tracks.items[0].name +
        "\nPreview: " +
        response.tracks.items[0].preview_url +
        "\nAlbum: " +
        response.tracks.items[0].album.name
    );
  })
  .catch(function(err) {
    console.log(err);
  });
