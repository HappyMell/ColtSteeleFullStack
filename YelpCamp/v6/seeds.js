var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [{
        name: "Cloud's Rest",
        image: "https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b0144496f7c17ea4eeb7_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Desert Mesa",
        image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104490f3c679a0eeb6ba_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Canyon Floor",
        image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144496f7c17ea4eeb7_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
]

//Remove all campgrounds
function seedDB() {
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err)
        }
        console.log("removed campgrounds!");
        //Add campground
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Added a campground");
                    //Create a comment
                    Comment.create({
                        text: "This place is great, but I wish there was internet",
                        author: "Homer"
                    }, function (err, comment) {
                        if (err) {
                            console.log(err)
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created a new comment")
                        }

                    });
                }
            })
        })
    });


}



module.exports = seedDB;