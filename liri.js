// Requires .env file
require("dotenv").config();
var SpotifyAPI = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var inquirer = require("inquirer");
var fs = require("fs");

//Require keys file for API keys and save to variable
var keys = require("./keys");

// Access Spotify keys
var spotify = new SpotifyAPI(keys.spotify);

console.log(spotify);

//inquirer prompt instead of using argv user input
inquirer
  .prompt([
    {
      type: "list",
      message: "what function do you want to run?",
      choices: [
        "concert-this",
        "spotify-this-song",
        "movie-this",
        "do-what-it-says"
      ],
      name: "input"
    }
  ])
  .then(function(inquirerResponse) {
    if (inquirerResponse.input == "concert-this") {
      console.log("ok!");
      inquirer
        .prompt([
          {
            message: "search for an artist",
            name: "concert"
          }
        ])
        .then(function(concertResponse) {
          concertThis(concertResponse.concert);
        });
    } else if (inquirerResponse.input == "spotify-this-song") {
      console.log("ok!");
      inquirer
        .prompt([
          {
            message: "search for a song",
            name: "spotify"
          }
        ])
        .then(function(spotifyResponse) {
          spotifyThis(spotifyResponse.spotify);
        });
    } else if (inquirerResponse.input == "movie-this") {
      //search omdb
    } else if (inquirerResponse.input == "do-what-it-says") {
      //do the fs thing
    } else {
      console.log("how did you manage to get here?");
    }
  });

//Take in user input, get rid of index 0 and 1
// const arg = process.argv;
// var userInput = arg.slice(2);
// console.log(userInput);

// if (process.argv.length === 2) {
//   userInput = "The Sign";
// }

//Use user input to search spotify
var spotifyThis = function(userInput) {
  spotify
    .search({ type: "track", query: userInput })
    .then(function(response) {
      //console.log(response.tracks);
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
};
var concertThis = function(artist) {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        artist +
        "/events?app_id=codingbootcamp"
    )
    .then(function(axiosResponse) {
      console.log(axiosResponse.data);
    });
};

var movieThis = function(movieInput){
    var url = "http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy";
    axios.get(url).then(movieResponse){
        console.log("got a movie!")
    }
}