
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.setAttribute("width",  width);
canvas.setAttribute("height",  height);

function play() {
    var form = document.getElementById("diffForm");
    var data = new FormData(form);
    var mode = "";
    for (const entry of data) {
        mode = entry[1];
    };

    speed = mode === "easy" ? slow : mode === "medium" ? medium : fast;

    pos = [];
    colors.values = [[50], [250], [50]];

    direction = "r";
    alive = true;

    for (var q = 0; q < startSize; q++){
        pos.push( [1, 1] );
        colors.values[0].push(50);
        colors.values[1].push(250);
        colors.values[2].push(50);
    }
    score = pos.length;
    square(0, 0,  width +  height, "black", 0);

    initFood();
    setTimeout(oneEngineStep, 500);
    document.getElementById("options").style.display = "none";
}
