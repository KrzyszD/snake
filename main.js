
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

window.onresize = setSizes;

function play() {
    var form = document.getElementById("diffForm");
    var data = new FormData(form);
    var mode = "";
    for (const entry of data) {
        mode = entry[1];
    };

    if (mode === "easy"){
        speed = slow;
        rowSize = 20;
        colSize = 20;
    } else if (mode === "medium"){
        speed = medium;
        rowSize = 30;
        colSize = 30;
    } else {
        speed = fast;
        rowSize = 40;
        colSize = 40;
    }
    
    setSizes(null)

    pos = [];
    colors.hsl = [[128], [100], [30]];

    direction = "r";
    alive = true;

    for (var q = 0; q < startSize; q++){
        pos.push( [1, 1] );
        
        colors.hsl[0].push(128);
        colors.hsl[1].push(100);
        colors.hsl[2].push(30);
    }
    score = pos.length;
    square(0, 0,  width +  height, "black", 0);

    foods = [];
    initFood();
    setTimeout(oneEngineStep, 500);
    document.getElementById("options").style.display = "none";
}

function oneEngineStep() {
    moveSnake();
    checkEatFood();
    drawSnake();
    collision();
    drawFood();
    if (alive){
        // Next frame
        setTimeout(oneEngineStep, speed);
    }
    if (speed <= fast && speed >= 2 / 3 * fast){
        // Make hard go faster over time
        speed *= 0.9995;
    }
}

function setSizes(evt) {
    var clientWidth = document.documentElement.clientWidth * 0.8;
    var clientHeight = document.documentElement.clientHeight * 0.8;

    var tileWidth = clientWidth / rowSize;
    var tileHeight = clientHeight / colSize;

    tileSize = Math.floor(Math.min(tileWidth, tileHeight));

    squareSize = Math.floor(0.8 * tileSize);
    if (squareSize % 2 === 1) squareSize--;
    if (tileSize % 2 === 1) tileSize--;
    
    canvas.setAttribute("width",  tileSize * rowSize);
    canvas.setAttribute("height",  tileSize * colSize);

    square(0, 0, Math.max(tileSize * rowSize, tileSize * colSize), "black", 0);

    drawSnakeAll();
    drawFood();
}
