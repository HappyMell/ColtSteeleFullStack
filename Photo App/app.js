//Setup
var bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    express = require("express"),
    app = express();

mongoose.connect("mongodb://localhost:27017/photo_app", {
    useNewUrlParser: true
});
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));
///////////////////////////////////////////////////////

//Photo Schema

var photoSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

var Photo = mongoose.model("Photo", photoSchema);

/////////////////////////////////////////////////////////////
//Redirect user to photos URL
app.get("/", function (req, res) {
    res.redirect("/photos");
});

//Photos URL
app.get("/photos", function (req, res) {
    Photo.find({}, function (err, photos) {
        if (err) {
            console.log(err)
        } else {
            res.render("index", {
                photos: photos
            });
        }
    });
})

//New Route
app.get("/photos/new", function (req, res) {
    res.render("new");
});

//Create route

app.post("/photos", function (req, res) {
    Photo.create(req.body.photo, function (err, newPhoto) {
        if (err) {
            res.render("new");
        } else {
            res.redirect("/photos");
        }
    });
});


//Show Route

app.get("/photos/:id", function (req, res) {
    Photo.findById(req.params.id, function (err, foundPhoto) {
        if (err) {
            res.redirect("/photos");
        } else {
            res.render("show", {
                photo: foundPhoto
            });
        }
    });
});

//Edit Route
app.get("/photos/:id/edit", function (req, res) {
    Photo.findById(req.params.id, function (err, foundPhoto) {
        if (err) {
            res.redirect("/photos");
        } else {
            res.render("edit", {
                photo: foundPhoto
            });
        }
    });
});

//Update Route
app.put("/photos/:id", function (req, res) {
    Photo.findByIdAndUpdate(req.params.id, req.body.photo, function (err, updatedPhoto) {
        if (err) {
            res.redirect("/photos");
        } else {
            res.redirect("/photos/" + req.params.id);
        }
    });
});


//Destroy Route
app.delete("/photos/:id", function (req, res) {
    Photo.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/photos");
        } else {
            res.redirect("/photos");
        }
    });
});

//Server/////////////////////////////////////////////////

app.listen(process.env.PORT || 3002, function () {
    console.log("Photo server has started");
})