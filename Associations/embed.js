var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo", {
    useNewUrlParser: true
});

//Post
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

//User
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var Post = mongoose.model("Post", postSchema);
var User = mongoose.model("User", userSchema);

//New user
/*
var newUser = new User({
    email: "harrypotter@brown.com",
    name: "Harry Potter"
});

//Push a post to user
newUser.posts.push({
    title: "Went on an adventure",
    content: "I killed voldemort finally!"
});


newUser.save(function (err, user) {
    if (err) {
        console.log(err);
    } else {
        console.log(user);
    }
});


//New post
var newPost = new Post({
    title: "I love cats!",
    content: "Cats are fun to cuddle with!"
});

newPost.save(function (err, post) {
    if (err) {
        console.log(err)
    } else {
        console.log(post);
    }
})
*/

User.findOne({
    name: "Harry Potter"
}, function (err, user) {
    if (err) {
        //  console.log(err);
    } else {
        user.posts.push({
            title: "I want to go to Hogsmeade",
            content: "Sad I cant go"
        });
        user.save(function (err, user) {
            if (err) {
                console.log(err);
            } else {
                console.log(user);
            }
        })
    }
});