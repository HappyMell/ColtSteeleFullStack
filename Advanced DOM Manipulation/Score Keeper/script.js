var playerOne = document.getElementById("playerOne");
var playerTwo = document.getElementById("playerTwo");
var scoreOne = document.querySelector("#playerOneDisplay");
var scoreTwo = document.querySelector("#playerTwoDisplay");
var resetButton = document.querySelector("#resetButton");
var changeWinningScore = document.querySelector("p span")
var numInput = document.querySelector("input[type='number']");
var playerOneScore = 0;
var playerTwoScore = 0;
var gameOver = false;
var winningScore = 5;

playerOne.addEventListener("click", function () {
    if (!gameOver) {
        playerOneScore++;
        if (playerOneScore == winningScore) {
            scoreOne.classList.add("winner")
            gameOver = true;
        }
        scoreOne.textContent = playerOneScore
    }

});

playerTwo.addEventListener("click", function () {
    if (!gameOver) {
        playerTwoScore++;
        if (playerTwoScore == winningScore) {
            scoreTwo.classList.add("winner")
            gameOver = true;
        }
        scoreTwo.textContent = playerTwoScore;
    }
});

resetButton.addEventListener("click", function () {
    reset();
});



numInput.addEventListener("change", function () {
    changeWinningScore.textContent = numInput.value;
    winningScore = numInput.value;
    reset();
});

function reset() {
    playerOneScore = 0;
    playerTwoScore = 0;
    scoreOne.textContent = playerOneScore
    scoreTwo.textContent = playerTwoScore;
    scoreOne.classList.remove("winner");
    scoreTwo.classList.remove("winner");
    gameOver = false;
}