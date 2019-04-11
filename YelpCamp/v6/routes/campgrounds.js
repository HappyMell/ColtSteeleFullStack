var express = require("express");
var router = express.Router();
var Review = require("../models/review");
var Campground = require("../models/campground");
var middleware = require("../middleware");
var NodeGeocoder = require('node-geocoder');
var multer = require('multer');
require("dotenv").config({
    path: '../.env'
});



//Google API (Google Maps)
var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};

var geocoder = NodeGeocoder(options);

//Multer Storage
var storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});
//Multer Filter
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({
    storage: storage,
    fileFilter: imageFilter
})

var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'mellisa',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});





//Camp Ground Page
router.get("/", function (req, res) {
    var perPage = 8;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
    var noMatch = null;
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Campground.find({
            name: regex
        }).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
            Campground.count({
                name: regex
            }).exec(function (err, count) {
                if (err) {
                    console.log(err);
                    res.redirect("back");
                } else {
                    if (allCampgrounds.length < 1) {
                        noMatch = "No campgrounds match that query, please try again.";
                    }
                    res.render("campgrounds/index", {
                        campgrounds: allCampgrounds,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        noMatch: noMatch,
                        search: req.query.search
                    });
                }
            });
        });
    } else {
        // get all campgrounds from DB
        Campground.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
            Campground.count().exec(function (err, count) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("campgrounds/index", {
                        campgrounds: allCampgrounds,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        noMatch: noMatch,
                        search: false
                    });
                }
            });
        });
    }
});

//Make a new campground page
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});



//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, upload.single('image'), function (req, res) {

    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };


    geocoder.geocode(req.body.location, function (err, data) {
        cloudinary.uploader.upload(req.file.path, function (result) {
            image = result.secure_url;
            var imageId = result.public_id;

            if (err || data.status === 'ZERO_RESULTS') {
                console.log(err);
                req.flash('error', 'Invalid address, try typing a new address');
                return res.redirect('back');
            }

            if (err || data.status === 'REQUEST_DENIED') {
                req.flash('error', 'Something Is Wrong Your Request Was Denied');
                return res.redirect('back');
            }

            if (err || data.status === 'OVER_QUERY_LIMIT') {
                req.flash('error', 'All Requests Used Up');
                return res.redirect('back');
            }

            var lat = data[0].latitude;
            var lng = data[0].longitude;
            var location = data[0].formattedAddress;



            var newCampground = {
                name: name,
                image: image,
                imageId: imageId,
                description: desc,
                author: author,
                price: price,
                location: location,
                lat: lat,
                lng: lng
            };

            Campground.create(newCampground, function (err, newlyCreated) {
                if (err) {
                    req.flash('error', err.message);

                    return res.redirect('back');

                } else {
                    console.log(newlyCreated);
                    req.flash("success", "Campground Added Successfully");
                    res.redirect("/campgrounds");
                }
            });
        });
    });
});

//Show info about one campground

router.get("/:id", function (req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").populate({
        path: "reviews",
        options: {
            sort: {
                createdAt: -1
            }
        }
    }).exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {
                campground: foundCampground
            });
        }
    });
});

//Edit campground route
router.get("/:id/edit", middleware.campgroundOwnership, function (req, res) {

    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render("campgrounds/edit", {
            campground: foundCampground
        });
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.campgroundOwnership, upload.single("image"), function (req, res) {
    geocoder.geocode(req.body.location, function (err, data) {

        if (err || !data.length) {
            console.log(err);
            req.flash('error', 'Invalid address');
            return res.redirect('back');
        }
        req.body.lat = data[0].latitude;
        req.body.lng = data[0].longitude;
        req.body.location = data[0].formattedAddress;

        Campground.findById(req.params.id, req.body.campground, async function (err, campground) {
            if (err) {
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                if (req.file) {
                    try {
                        await cloudinary.v2.uploader.destroy(campground.imageId);
                        var result = await cloudinary.v2.uploader.upload(req.file.path);
                        campground.imageId = result.public_id;
                        campground.image = result.secure_url;
                    } catch (err) {
                        req.flash("error", err.message);
                        return res.redirect("back");
                    }

                }
                campground.name = req.body.name;
                campground.description = req.body.description;
                campground.price = req.body.price;
                campground.location = req.body.location;
                campground.lat = req.body.lat;
                campground.lng = req.body.lng;
                campground.save();
                req.flash("success", "Successfully Updated!");
                res.redirect("/campgrounds/" + campground._id);
            }
        });
    });
});
//Delete /Destroy Campground Route
router.delete("/:id", middleware.campgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {

            Review.remove({
                "_id": {
                    $in: campground.reviews
                }
            }, function (err) {
                if (err) {
                    console.log(err);
                    return res.redirect("/campgrounds");
                }
                campground.remove();
                req.flash("success", "Campground deleted successfully!");
                res.redirect("/campgrounds");
            });

        }
    });
});


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;