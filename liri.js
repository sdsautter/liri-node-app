var request = require("request");
var twitter = require("twitter");
var spotify = require("spotify");
var keys = require("./keys.js");
var operation = process.argv[2];

var client = new twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
});

if (process.argv[2]) {
    if (operation.toLowerCase() === "my-tweets") {

        tweets();

    } else if (operation.toLowerCase() === "spotify-this-song") {

        spotifySearch();

    } else if (operation.toLowerCase() === "movie-this") {

        movieSearch();

    } else if (operation.toLowerCase() === "do-what-it-says") {

    }

} else {
    console.log("Please add an action:");
    console.log("my-tweets,");
    console.log("spotify-this-song,");
    console.log("movie-this,");
    console.log("or do-what-it-says");
}


function tweets() {
    var params = { screen_name: 'JamboneMcHoney' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            if (tweets.length <= 20) {
                for (var i = 0; i < tweets.length; i++) {

                    console.log("######################################");
                    console.log("");
                    console.log(" \"" + tweets[i].text + "\"");
                    console.log("");
                    console.log("  @" + tweets[i].user.screen_name);
                    console.log("  " + tweets[i].created_at);
                    console.log("");

                }
            }
        } else {
            for (var i = 0; i < 20; i++) {

                console.log("######################################");
                console.log("");
                console.log(" \"" + tweets[i].text + "\"");
                console.log("");
                console.log("  @" + tweets[i].user.screen_name);
                console.log("  " + tweets[i].created_at);
                console.log("");
            }
        }

        console.log("######################################");

    });
}

function spotifySearch() {

    var songName = "";

    if (process.argv[3]) {
        for (var i = 3; i < process.argv.length; i++) {

            songName += process.argv[i] + " ";
        }
    } else {
        songName = "The Sign ace of base";
    }

    spotify.search({ type: 'track', query: songName.trim() }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        // console.log(data);
        // Artist Name
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);

        //Song Name
        console.log("Song: " + data.tracks.items[0].name);

        //Album
        console.log("Album: " + data.tracks.items[0].album.name);

        //Preview Link
        console.log("Preview: " + data.tracks.items[0].preview_url);


    });


}

function movieSearch() {

    var movieName = "";

    for (var i = 3; i < process.argv.length; i++) {

        movieName += process.argv[i] + "+";
        // if (i === (process.argv.length - 1)) {
        //     rtMovieName += process.argv[i];
        // } else {
        //     rtMovieName += process.argv[i] + "_";

        // }
    }

    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json", function(error, response, body) {
        // console.log('error:', error); // Print the error if one occurred 
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
        // console.log('body:', JSON.parse(body)); // Print the HTML for the Google homepage. 
        
        var rtMovieName = JSON.parse(body).Title.replace(/ /g, "_");
        rtMovieName = rtMovieName.replace(/:/g, "");
        rtMovieName = rtMovieName.replace(/-/g, "");
        rtMovieName = rtMovieName.replace(/__/g, "_");


        console.log("Title: " + JSON.parse(body).Title);
        console.log("Released: " + JSON.parse(body).Released);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Country Produced: " + JSON.parse(body).Country);
        console.log("Language(s): " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        if (JSON.parse(body).Ratings) {
            for (var i = 0; i < JSON.parse(body).Ratings.length; i++) {
                if (JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes") {
                    console.log("Rotten Tomatoes Score: " + JSON.parse(body).Ratings[i].Value);
                    console.log("Rotten Tomatoes URL: https://www.rottentomatoes.com/m/" + rtMovieName);
                }
            }
        }





    });
}
