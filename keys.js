require("dotenv").config();

console.log("this is loaded");

//store spotify API keys
exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
