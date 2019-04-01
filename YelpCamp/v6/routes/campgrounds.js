var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//Camp Ground Page
router.get("/", function (req, res) {

    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds,
                currentUser: req.user
            });
        }
    });

});

//Make a new campground page
router.get("/new", isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});



//Post route (the form logic)
router.post("/", isLoggedIn, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {
        name: name,
        author: author,
        image: image,
        description: desc
    }
    Campground.create(newCampground, function (err, newlyMadeCampground) {
        if (err) {
            console.log(err)
        } else {
            console.log(newlyMadeCampground)
            res.redirect("/campgrounds/new");

        }
    })
});

//Show info about one campground

router.get("/:id", function (req, res) {
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

//Edit campground route
router.get("/:id/edit", campgroundOwnership, function (req, res) {

    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render("campgrounds/edit", {
            campground: foundCampground
        });
    });
});

//Update Campground route
router.put("/:id", campgroundOwnership, function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Delete /Destroy Campground Route
router.delete("/:id", campgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds")
        }
    })
})


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}

function campgroundOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                res.redirect("back")
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }


            }
        })
    } else {
        res.redirect("back");
    }
}


module.exports = router;