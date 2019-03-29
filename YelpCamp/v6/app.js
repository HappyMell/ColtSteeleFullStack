var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    Campground = require("./models/campground");
Comment = require("./models/comment");
seedDB = require("./seeds");
seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp_v4", {
    useNewUrlParser: true
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/public"));
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
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds
            });
        }
    });

});

//Make a new campground page
app.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new");
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
            res.redirect("/campgrounds/new");

        }
    })
});

//Show info about one campground

app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds/show", {
                campground: foundCampground
            });

        }
    });
});

//Comments route

app.get("/campgrounds/:id/comments/new", function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err)
        } else {
            res.render("comments/new", {
                campground: campground
            });
        }
    })
});

//Submitting the comment page
app.post("/campgrounds/:id/comments", function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
})



//Server///////////////////////////////////////////////////////////////////////
app.listen(process.env.PORT || 3000, function () {
    console.log("YelpCamp server has started");
})