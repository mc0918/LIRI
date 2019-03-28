// Requires .env file
require("dotenv").config();
var SpotifyAPI = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var inquirer = require("inquirer");
var fs = require("fs");
const chalk = require("chalk");
var figlet = require("figlet");

//Require keys file for API keys and save to variable
var keys = require("./keys");

// Access Spotify keys
var spotify = new SpotifyAPI(keys.spotify);

debugger;

var title = figlet.textSync("LIRI", {
  font: "epic",
  horizontalLayout: "default",
  verticalLayout: "default"
});
console.log(chalk.bold.red(title));

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
          var userInput = concertResponse.concert.split(" ").join("");
          //console.log(userInput);

          debugger;

          concertThis(userInput);
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
      console.log("movie incoming!");
      inquirer
        .prompt([
          {
            message: "search for a movie",
            name: "movie"
          }
        ])
        .then(function(movieResponse) {
          movieThis(movieResponse.movie);
        });
    } else if (inquirerResponse.input == "do-what-it-says") {
      doWhatItSays();
    } else {
      console.log("how did you manage to get here?");
    }
  });

//Use user input to search spotify
var spotifyThis = function(userInput) {
  spotify
    .search({ type: "track", query: userInput })
    .then(function(response) {
      //console.log(response.tracks);
      for (i = 0; i < response.tracks.items.length; i++) {
        console.log("-----------");
        console.log(
          "Artist: " +
            response.tracks.items[i].artists[0].name +
            "\nSong: " +
            response.tracks.items[i].name +
            "\nPreview: " +
            response.tracks.items[i].preview_url +
            "\nAlbum: " +
            response.tracks.items[i].album.name
        );
      }
    })
    .catch(function(err) {
      console.log(err);
    });
};

//uses bandsintown api to find concert dates
var concertThis = function(artist) {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        artist +
        "/events?app_id=codingbootcamp"
    )
    .then(function(axiosResponse) {
      for (i = 0; i < axiosResponse.data.length; i++) {
        //console.log(axiosResponse.data[i].datetime);
        var format = moment(axiosResponse.data[i].datetime).format(
          "MMMM Do YYYY, h:mm:ss"
        );
        console.log(format);

        console.log(axiosResponse.data[i].venue.name);
        console.log(axiosResponse.data[i].venue.city);
        console.log("------------------");
      }
      //console.log(axiosResponse.data[0].venue.city);
    });
};

//uses omdb api to find movie
var movieThis = function(movieInput) {
  var url =
    "http://www.omdbapi.com/?t=" + movieInput + "&y=&plot=short&apikey=trilogy";
  axios.get(url).then(function(movieResponse) {
    console.log("got a movie!");
    console.log(movieResponse.data);
    console.log(
      "Title: " +
        movieResponse.data.Title +
        "\nYear: " +
        movieResponse.data.Year +
        "\nIMDB Rating: " +
        movieResponse.data.imdbRating +
        "\nRotten Tomatoes Rating: " +
        movieResponse.data.Ratings[1].Value +
        "\nCountry: " +
        movieResponse.data.Country +
        "\nLanguage: " +
        movieResponse.data.Language +
        "\nPlot: " +
        movieResponse.data.Plot +
        "\nActors: " +
        movieResponse.data.Actors
    );
  });
};

//reads the command typed on random.txt
var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
    var dataArr = data.split(",");
    console.log(dataArr);
    switch (dataArr[0]) {
      case "spotify-this-song":
        spotifyThis(dataArr[1]);
        break;
      case "concert-this":
        concertThis(dataArr[1]);
        break;
      case "movie-this":
        movieThis(dataArr[1]);
        break;
      default:
        console.log("something is wrong with the file");
    }
  });
};
