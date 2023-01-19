
var foods = [];

var direction = "r";
var alive = true;
var score = 0;

var scoreLow = 0;
var scoreMed = 0;
var scoreHigh = 0;

var speed = 5000/60;

var newPos = true;
var pos = [];
var lastPos = [];

var colors = {
    direction: [1, 1, 1],
    momentum: [10, 10, 10],
    momentumCap: 10,
    momentumReduction: 0.8,
    hsl: [[], [], []]
}

function keyPress(event) {
    if (!newPos)
        return

    switch (event.key) {
        case "ArrowUp":
            if (direction != "d")
                direction = "u";
                newPos = false;
            break;
        case "ArrowLeft":
            if (direction != "r")
                direction = "l";
                newPos = false;
            break;
        case "ArrowDown":
            if (direction != "u")
                direction = "d";
                newPos = false;
            break;
        case "ArrowRight":
            if (direction != "l")
                direction = "r";
                newPos = false;
            break;
        default:
            break;
    }
}

function gameover() {
    alive = false;
    document.getElementById("options").style.display = "block";

    if (speed === slow && score > scoreLow){
        scoreLow = score;
    } else if (speed === medium && score > scoreMed){
        scoreMed = score;
    } else if (score > scoreHigh){
        scoreHigh = score;
    }

    var scores = "<table><col width=\"80\"><col width=\"150\"><col width=\"80\"><tr><th></th><th>High Scores</th><th></th></tr>";
    scores += "<tr><td>Easy</td><td>Medium</td><td>Hard</td></tr>";
    scores += "<tr><td>" + scoreLow + "</td><td>" + scoreMed + "</td><td>" + scoreHigh + "</td></tr>";
    score += "</table>";

    document.getElementById("highScores").innerHTML = scores;
}

function checkEatFood() {
    for (var i = 0; i < numFood; i++){
        if (compareArrays(pos[0], foods[i])) {

            var h = colors.hsl[colors.hsl.length - 1];
            var s = colors.hsl[colors.hsl.length - 1];
            var l = colors.hsl[colors.hsl.length - 1];
    
            for(var x = 0; x < growRate; x++){
                
                colors.hsl[0].push(h);
                colors.hsl[1].push(s);
                colors.hsl[2].push(l);
                
                pos.push(pos[pos.length - 1]);
    
                score++;
            }
    
            document.getElementById("score").innerHTML = "Score: " + score;
            
            foods.splice(i, 1);
            foods.push(getnewFoodPos());
            return
        }
    }
}

function initFood(){
    for (var i = 0; i < numFood; i++){
        foodPosition = getnewFoodPos();
        if (foodPosition != null)
            foods.push(foodPosition);
    }
}

function getnewFoodPos() {
    possiblePos = [];
    for (var x = 0; x < rowSize; x++){
        for (var y = 0; y < colSize; y++){
            possiblePos.push( [x, y] );
        }
    }
    while (possiblePos.length > 0) {
        var index = Math.floor( Math.random() * possiblePos.length );
        position = possiblePos[index];
        possiblePos.splice(index, 1)
        var goodPosition = true;

        for (var segment = 0; segment < pos.length; segment++) {
            if (compareArrays(pos[segment], position)){
                goodPosition = false;
                break;
            }
        }
        if (!goodPosition) {
            continue
        }

        for (var i = 0; i < foods.length; i++) {
            if (compareArrays(foods[i], position)){
                goodPosition = false;
                break;
            }
        }
        if (!goodPosition) {
            continue
        }
        return position;
    }
    return null;
}

function collision() {
    if (pos[0][0] === -1 || pos[0][1] === -1 ||
        (pos[0][0]) > rowSize - 1 || 
        (pos[0][1]) > colSize - 1){
        gameover();
    } else {
        for (var i = 1; i < pos.length; i++){
            if (compareArrays(pos[i], pos[0])) {
                gameover();
                break;
            }
        }
    }
}

function compareArrays(a, b) {
    if (a === null || b === null)
        return a === b;
    return a[0] === b[0] && a[1] === b[1];
};
