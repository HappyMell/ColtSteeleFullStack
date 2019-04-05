var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground")


//Root Route

router.get("/", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds,
                page: 'campgrounds'
            });
        }
    });
});


//Register page & register form
router.get("/register", function (req, res) {
    res.render("register", {
        page: "register"
    });
})

//Handle sign up logic
router.post("/register", function (req, res) {
    var newUser = new User({
        username: req.body.username
    })
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            return res.render("register", {
                error: err.message
            });
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to YelpCamp " + user.username)
            res.redirect("/campgrounds");
        });
    });
});


//Show login form
router.get("/login", function (req, res) {
    res.render("login", {
        page: "login"
    });
});

//Handle login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {

});

//Logout
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "You have been logged out")
    res.redirect("/campgrounds");
})



module.exports = router;