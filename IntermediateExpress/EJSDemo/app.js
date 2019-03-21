var express = require("express");
var app = express();


app.use(express.static("public"));
app.set("view engine", "ejs")

app.get("/", function(req, res) {
    res.render("index");
})

app.get("/fallinlovewith/:thing", function(req, res) {
var thing = req.params.thing;
res.render("love", {thingVar: thing});
})


app.get("/posts", function(req, res) {
   var posts = [ {
       title: "Cats love to play", 
       author: "Suzy"
   },
    {
       title: "I love chicken wings", 
       author: "Mellisa"
   },
    {
       title: "It's nap time!", 
       author: "Ben"
   },
       ];
       
res.render("posts", {posts: posts})       
})








app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server started")
})