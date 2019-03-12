var numberOfSquares = 9;
var colors;
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var header = document.querySelector("h1");
var modeButtons = document.querySelectorAll(".mode");

init();

function reset() {
    colors = randomColorGenerator(numberOfSquares);
    pickedColor = colorPicker();
    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = "";
    resetButton.textContent = "New Colors";

    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none"
        }
    }
    header.style.backgroundColor = "steelblue";
}



resetButton.addEventListener("click", function () {
    reset();
});

function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function colorPicker() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function randomColorGenerator(num) {
    var array = [];
    for (var i = 0; i < num; i++) {
        array.push(randomColor())
    }
    return array;
}

function randomColor() {
    var randomRed = Math.floor(Math.random() * 256);
    var randomGreen = Math.floor(Math.random() * 255);
    var randomBlue = Math.floor(Math.random() * 255);
    return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
}

function init() {
    modeButtonSetup();
    contentLogic();
    reset();
}

function modeButtonSetup() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            modeButtons[2].classList.remove("selected");
            this.classList.add("selected");

            this.textContent === "Easy" ? numberOfSquares = 3
                : this.textContent === "Hard" ? numberOfSquares = 6
                    : numberOfSquares = 9


            reset();
        });
    }
}

function contentLogic() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function () {
            var clickedColor = this.style.backgroundColor;

            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                messageDisplay.style.color = "rgb(114, 211, 53)";
                changeColors(clickedColor);
                header.style.backgroundColor = clickedColor;
                resetButton.textContent = "Play Again?";
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
                messageDisplay.style.color = "rgb(238, 55, 108)"
            }
        });
    }
}