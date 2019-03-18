var scores = [90, 98, 89, 100, 100, 86, 94];
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
var total = 0;
var total2 = 0;


function average(scores) {
    scores.forEach(function (score) {
        total += score;
    });
    var avg = total/scores.length;
    return Math.round(avg);
}
console.log(average(scores));

function average2(scores2) {
    scores2.forEach(function(score){
        total2 += score;
    });
    var avg = total2 / scores2.length;
    
    return Math.round(avg);
}

console.log(average2(scores2));