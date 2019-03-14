$("h1").text("New Text!");
$("ul").html("<li>I hacked your UL!</li><li>What you gonna do?</li>");
$("img").css("width", "200px");

$("img:first").attr("src", "https://www.catster.com/wp-content/uploads/2018/07/Savannah-cat-long-body-shot.jpg");
$("img").last().attr("src", "https://www.catster.com/wp-content/uploads/2018/07/Savannah-cat-long-body-shot.jpg");
$("select").val();

$("h1").addClass("correct");
$("h1").removeClass("correct");
$("li").addClass("wrong");
$("li").removeClass("wrong");
$("li").addClass("correct");

$("li").toggleClass("correct");
$("li").first().toggleClass("done");
$("li").toggleClass("done");