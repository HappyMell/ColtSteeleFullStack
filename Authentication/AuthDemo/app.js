//Set Up
var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    User = require("./models/user"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")

mongoose.connect("mongodb://localhost:27017/secretApp", {
    useNewUrlParser: true
});

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(require("express-session")({
    secret: "I love cats all day",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());

app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

///////////////////////////////////////////////////////////////////////////////////////////

//Root Route
app.get("/", function (req, res) {
    res.render("home");
});

//Secret Route
app.get("/secret", isLoggedIn, function (req, res) {
    res.render("secret");
})

//Register Route
app.get("/register", function (req, res) {
    res.render("register");
});

//Handling user sign up
app.post("/register", function (req, res) {
    User.register(new User({
        username: req.body.username
    }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secret");
            });
        }
    });
});


//Login Route
app.get("/login", function (req, res) {
    res.render("login");
});

//Login logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function (req, res) {

});

//Logout
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

//Check if someone is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");

}

//Server//////////////////////////////////////////////////////////////////////////////////////
app.listen(process.env.PORT || 3000, function () {
    console.log("Auth server has started");
})