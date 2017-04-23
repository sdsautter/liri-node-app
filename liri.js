var request = require("request");
var twitter = require("twitter");
var spotify = require("spotify");

request("http://www.omdbapi.com/?t=Cinderella&y=&plot=short&r=json", function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred 
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  console.log('body:', body); // Print the HTML for the Google homepage. 
});