// Requires .env file
require("dotenv").config();

// Access Spotify keys
var spotify = new Spotify(keys.spotify);

console.log("good to go!");
