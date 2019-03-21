var express = require("express");
var app = express();





app.get("/", function(req, res) {
   res.send("Hi There!!"); 
});


app.get("/bye", function(req, res) {
   res.send("See you later!"); 
});

app.get("/cat", function(req, res) {
    console.log("Someone made a request to /cat");
   res.send("MEOW!!"); 
});


app.get("/r/:subredditName", function(req, res) {
   var subreddit = req.params.subredditName;
    res.send("Welcome to the " +  subreddit.toUpperCase() + " subreddit!! :)");
});

app.get("/r/:subredditName/comments/:id/:title", function(req, res) {
    console.log(req.params);
    res.send("Welcome to a subreddit!! :)");

});


app.get("*", function(req, res) {
    res.send("You are a star!");
});


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started")
});