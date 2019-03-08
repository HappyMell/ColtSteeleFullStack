var lists = document.querySelectorAll("li");

for (var i = 0; i < lists.length; i++) {
    lists[i].addEventListener("mouseover", function () {
        this.classList.add("selected");
    });
    lists[i].addEventListener("mouseout", function () {
        this.classList.remove("selected");
    });

    lists[i].addEventListener("click", function () {
        this.classList.toggle("done");
    });
}