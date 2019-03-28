var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2", {
    useNewUrlParser: true
});

var Post = require("./models/post");
var User = require("./models/user");



Post.create({
    title: "I love burgers even more more more sgfgdsfg!",
    content: "sdfgvsdfgsdfgsdgdsfgdfgd rgergsdrg  rg argdfgdsfh"
}, function (err, post) {
    User.findOne({
        email: "KFC@colonel.com"
    }, function (err, foundUser) {
        if (err) {
            console.log(err)
        } else {
            foundUser.posts.push(post);
            foundUser.save(function (err, data) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(data);
                }
            })
        }
    });

})

/*
//Find User / Find all posts for that user

User.findOne({
    name: "Chicken Little"
}).populate("posts").exec(function (err, user) {
    if (err) {
        console.log(err)
    } else {
        console.log(user);
    }
});

*/