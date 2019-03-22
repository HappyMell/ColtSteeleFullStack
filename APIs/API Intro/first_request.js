var request = require("request");

/*
request("http://www.reddit.com", function (error, response, body) {
    if (error) {
        console.log("There is an error");
        console.log(error)
    } else {
        if (response.statusCode === 200) {
            console.log(body)
        }
    }
});

*/


request("https://jsonplaceholder.typicode.com/users/1", function (error, response, body) {
    eval(require('locus'));
    if (!error && response.statusCode == 200) {
        var parsedData = JSON.parse(body);
        console.log(parsedData["query"]["results"]["channel"]["astronomy"]["sunset"])
    }
});