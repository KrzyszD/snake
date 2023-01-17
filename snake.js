
function drawSnake() {
    // Draw the head and erases the tail if it move

    // draw first square
    var r = colors.values[0][0];
    var g = colors.values[1][0];
    var b = colors.values[2][0];

    var color = "rgb(" + r + ", " + g + ", " + b + ")";
    
    square(pos[0][0] * tileSize, pos[0][1] * tileSize, squareSize, color, 1);

    if (drawMiddleSegment) {
        // Draw connecting part of snake segments
        var midRed = (colors.values[0][0] + colors.values[0][1]) / 2;
        var midGreen = (colors.values[1][0] + colors.values[1][1]) / 2;
        var midBlue = (colors.values[2][0] + colors.values[2][1]) / 2;

        color = "rgb(" + midRed + ", " + midGreen + ", " + midBlue + ")";

        var midX = (pos[0][0] + pos[1][0]) / 2;
        var midY = (pos[0][1] + pos[1][1]) / 2;

        square(midX * tileSize, midY * tileSize, squareSize, color, 1);
    }

    if (!compareArrays(lastPos, pos[pos.length - 1])){
        // Remove last square if the end moves
        square(lastPos[0] * tileSize, lastPos[1] * tileSize, tileSize, "black", 0);
    }

}

function drawSnakeAll() {
    // Redraws the entire snake

    for (var segment = 0; segment < pos.length; segment++){
        var r = colors.values[0][segment];
        var g = colors.values[1][segment];
        var b = colors.values[2][segment];

        var color = "rgb(" + r + ", " + g + ", " + b + ")";
    
        square(pos[segment][0] * tileSize, pos[segment][1] * tileSize, squareSize, color, 1);
    
        if (drawMiddleSegment && segment < pos.length - 1) {
            // Draw connecting part of snake segments
            r = (r + colors.values[0][segment + 1]) / 2;
            g = (g + colors.values[1][segment + 1]) / 2;
            b = (b + colors.values[2][segment + 1]) / 2;
    
            color = "rgb(" + r + ", " + g + ", " + b + ")";
    
            var midX = (pos[segment][0] + pos[segment + 1][0]) / 2;
            var midY = (pos[segment][1] + pos[segment + 1][1]) / 2;
    
            square(midX * tileSize, midY * tileSize, squareSize, color, 1);
        }
    }

}

function moveSnake() {
    newPos = true;

    lastPos = pos.pop()

    switch (direction) {
        case "r":
            pos.unshift( [pos[0][0] + 1, pos[0][1]] );
            break;
        case "l":
            pos.unshift( [pos[0][0] - 1, pos[0][1]] );
            break;
        case "u":
            pos.unshift( [pos[0][0], pos[0][1] - 1] );
            break;
        default:
            pos.unshift( [pos[0][0], pos[0][1] + 1] );
            break;
    }

    for (var i = 0; i < 3; i++){
        colors.momentum[i] += colors.direction[i] * Math.random() * 3;

        colors.values[i].unshift(colors.values[i][0] + colors.momentum[i]);
        colors.values[i].pop();

        if (colors.momentum[i] > 20 || colors.momentum[i] < -20){
            colors.momentum[i] *= 0.9;
        }

        if (colors.values[i][0] > 200){
            colors.direction[i] = -1;
            colors.momentum[i] *= 0.9;
        } else if (colors.values[i][0] < 100) {
            colors.direction[i] = 1;
            colors.momentum[i] *= 0.8;
        }
    }

}
