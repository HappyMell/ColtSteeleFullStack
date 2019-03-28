var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    Campground = require("./models/campground");
seedDB = require("./seeds");
seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");



/*
Campground.create({
    name: "Salmon Creek",
    image: "https://farm2.staticflickr.com/1034/3168401233_5afb7c29fd.jpg",
    description: "This is a huge granite hill, no bathrooms, No water. Beautiful granite!"
}, function (err, campground) {
    if (err) {
        console.log(err)
    } else {
        console.log("newly created campground")
        console.log(campground);
    }
})

*/

//Home Page
app.get("/", function (req, res) {
    res.render("landing")
});

//Camp Ground Page
app.get("/campgrounds", function (req, res) {

    // 
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err)
        } else {
            res.render("index", {
                campgrounds: allCampgrounds
            });
        }
    });

});

//Make a new campground page
app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs");
});



//Post route (the form logic)
app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {
        name: name,
        image: image,
        description: desc
    }
    Campground.create(newCampground, function (err, newlyMadeCampground) {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/campgrounds");

        }
    })
});

//Show info about one campground

app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err)
        } else {
            res.render("show", {
                campground: foundCampground
            });

        }
    });
});

//Server
app.listen(process.env.PORT || 3000, function () {
    console.log("YelpCamp server has started");
})