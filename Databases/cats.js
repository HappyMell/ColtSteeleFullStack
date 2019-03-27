var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/cat_app", {
    useNewUrlParser: true
});

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperment: String
});

var Cat = mongoose.model("Cat", catSchema);

/*
var george = new Cat({
    name: "Mrs.Norris",
    age: 101,
    temperment: "Evil"
});

george.save(function (err, cat) {
    if (err) {
        console.log("Something went wrong")
    } else {
        console.log("We just saved a cat to the DB")
        console.log(cat)
    }

});

*/

Cat.create({
    name: "Snowball",
    age: 15,
    temperment: "Nice"
}, function (err, cat) {
    if (err) {
        console.log(err)
    } else {
        console.log(cat)
    }
});

Cat.find({}, function (err, cats) {
    if (err) {
        console.log(`There was an error ${err}`)
    } else {
        console.log("ALL THE CATS........")
        console.log(cats);
    }
})