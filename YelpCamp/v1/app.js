var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


var campgroundsArray = [
    { name: "Salmon Creek", image: "https://farm2.staticflickr.com/1034/3168401233_5afb7c29fd.jpg" },
    { name: "Granite Hill", image: "https://farm1.staticflickr.com/82/225912054_690e32830d.jpg" },
    { name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg" }
]

//Home Page
app.get("/", function (req, res) {
    res.render("landing")
});

//Camp Ground Page
app.get("/campgrounds", function (req, res) {

    res.render("campgrounds", { campgrounds: campgroundsArray });
});

//Make a new campground page
app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs");
});



//Post route (the form logic)
app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = { name: name, image: image }
    campgroundsArray.push(newCampground);

    res.redirect("/campgrounds");
});



//Server
app.listen(process.env.PORT || 3000, function () {
    console.log("YelpCamp server has started");
})