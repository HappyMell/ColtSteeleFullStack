$("h1").click(function () {
    //alert("h1 clicked!")
});

$("button").click(function () {
    var text = $(this).text();
    $(this).css("background", "pink");
    console.log(`You clicked ${text}`);
});

$("input").keypress(function (event) {
    if (event.which === 13) {
        alert("You hit enter")
    }
});

$("h1").on("click", function () {
    $(this).css("color", "purple");
});

$("input").on("keypress", function () {
    console.log("Key pressed");
});

$("button").on("mouseenter", function () {
    $(this).css("font-weight", "bold");
});

$("button").on("mouseleave", function () {
    $(this).css("font-weight", "normal");
});

