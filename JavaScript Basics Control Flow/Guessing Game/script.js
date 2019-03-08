var myNumber = 7;
var theGuess = prompt(`What number am I thinking of?`);

if (Number(theGuess) === myNumber) {
    alert(`Correct!`);
} else if (Number(theGuess) < myNumber) {
    alert(`Too low, try again!`);
} else if (Number(theGuess) > myNumber) {
    alert(`Too high, try again`);
}