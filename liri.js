var request = require("request");
var twitter = require("twitter");
var spotify = require("spotify");
var moment = require("moment");
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
            for (var i = 0; i < tweets.length; i++) {

                console.log("######################################");
                console.log("");
                console.log(" \"" + tweets[i].text + "\"");
                console.log("");
                console.log("  @" + tweets[i].user.screen_name);
                console.log("  on " + tweets[i].created_at);
                console.log("");

            }
        }
    });
}

function movieSearch() {

    var movieName = "";

    for (var i = 3; i < process.argv.length; i++) {

        movieName += process.argv[i] + "+";
    }

    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json", function(error, response, body) {
        console.log('error:', error); // Print the error if one occurred 
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
        console.log('body:', JSON.parse(body)); // Print the HTML for the Google homepage. 
    });
}
