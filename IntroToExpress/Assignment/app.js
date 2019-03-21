var express = require("express");
var app = express();



app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
    var sounds = {
        pig: "Oink",
        cow: "Moo!",
        dog: "Woof",
        cat: "Let's cuddle!"
    }
    
    var animal = req.params.animal.toLowerCase();
   var sound = sounds[animal];
   res.send("The " + animal + " says " + sound);
   
});



app.get("/repeat/:word/:number", function(req, res) {
  
     var numbers = parseInt(req.params.number);
    var words = req.params.word; 
    var result = " ";

    for(var i = 0; i < numbers; i++) {
        result += words + " "
    }

    res.send(result);
});

app.get("*", function (req, res) {
    res.send("Sorry, your princess is in another castle")
})










app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started")
});