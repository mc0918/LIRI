# LIRI

Command line node app that takes in parameters and gives back data.

# HOW TO USE THIS APP

---

## A question before you begin

-- Do you know how to use Github, Node, and Git Bash (or another command line interface)?

- If yes, continue onwards. If no, please familiarize yourself with them or you will be unable to run the program.

## Now

1. Clone this repository from Github and navigate to the folder via command line
   ![Command Line](...)

2. Run the liri.js file using Node.js
   ![liri](...)

3. This starts LIRI. You can choose any of the functions to run but I'll start in order, beginning with "concert-this". Select "concert-this" using the arrow keys and press enter.

4. An input prompt will appear asking for an artist. Type an artist and press enter.
   ![pre-concert](...)

5. If any upcoming concerts are found using the BandsInTown API, they will appear below, listing the date, venue, and city the concert is in. The program will then end. If no upcoming concerts are found, the result will be blank and the program will end.
   ![concert](...)

6. Using step 2, run the liri app again (pressing the up arrow key will bring up the most recent command). This time navigate to "spotify-this-song" and hit enter.

7. A prompt will appear asking for a song. Type your desired song and press enter.
   ![spotify](...)

8. Using the Spotify node API, LIRI will return a list of songs with the specified name, starting with the most popular. Once again, the program will end after displaying the results. If there are no results to display, the program will end.
   ![spotify-results](...)

9. Now for "movie-this". Same routine, run LIRI, select "movie-this" and press enter. A prompt will ask for the movie you want info about. Type in a movie and press enter. Sit back and watch the results come in from the OMDB API.
   ![movie](...)

10. Finally, "do-what-it-says." Simply select the command, press enter, and sit back. This function runs whatever command is written on the file "random.txt."
    ![do-what-it-says](...)
