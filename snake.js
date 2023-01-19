
function drawSnake() {
    // Draw the head and erases the tail if it move

    // Draw middle segment first for a cleaner look
    if (drawMiddleSegment) {
        // Draw connecting part of snake segments
        var midH = (colors.hsl[0][0] + colors.hsl[0][1]) / 2;
        if (Math.abs(midH - colors.hsl[0][0]) > 50){
            // Since H in HSL can go from 0 to 360 instantly
            // change midH to 0
            midH = 0
        }

        var midS = (colors.hsl[1][0] + colors.hsl[1][1]) / 2;
        var midL = (colors.hsl[2][0] + colors.hsl[2][1]) / 2;

        var color = "hsl(" + midH + ", " + midS + "%, " + midL + "%)";

        var midX = (pos[0][0] + pos[1][0]) / 2;
        var midY = (pos[0][1] + pos[1][1]) / 2;

        square(midX * tileSize, midY * tileSize, squareSize, color, 1);
    }

    // draw first square    
    var h = colors.hsl[0][0];
    var s = colors.hsl[1][0];
    var l = colors.hsl[2][0];

    var color = "hsl(" + h + ", " + s + "%, " + l + "%)";
    
    square(pos[0][0] * tileSize, pos[0][1] * tileSize, squareSize, color, 1);

    if (!compareArrays(lastPos, pos[pos.length - 1])){
        // Remove last square if the end moves
        square(lastPos[0] * tileSize, lastPos[1] * tileSize, tileSize, "black", 0);
    }

}

function drawSnakeAll() {
    // Redraws the entire snake

    for (var segment = 0; segment < pos.length; segment++){
    
        var h = colors.hsl[0][segment];
        var s = colors.hsl[1][segment];
        var l = colors.hsl[2][segment];
    
        var color = "hsl(" + h + ", " + s + "%, " + l + "%)";
    
        square(pos[segment][0] * tileSize, pos[segment][1] * tileSize, squareSize, color, 1);
    
        if (drawMiddleSegment && segment < pos.length - 1) {
            // Draw connecting part of snake segments
            h = (h + colors.hsl[0][segment + 1]) / 2;
            s = (s + colors.hsl[1][segment + 1]) / 2;
            l = (l + colors.hsl[2][segment + 1]) / 2;

            if (Math.abs(h - colors.hsl[0][segment]) > 50){
                // Since H in HSL can go from 0 to 360 instantly
                // change midH to 0
                h = 0
            }
    
            color = "hsl(" + h + ", " + s + "%, " + l + "%)";
    
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
        
        colors.hsl[i].unshift(colors.hsl[i][0] + colors.momentum[i]);
        colors.hsl[i].pop();

        if (colors.momentum[i] > colors.momentumCap || colors.momentum[i] < -colors.momentumCap){
            colors.momentum[i] *= colors.momentumReduction;
        }
    }
    colors.hsl[0][0] = (colors.hsl[0][0] + 360) % 360;

    if (colors.hsl[1][0] > 100){
        colors.hsl[1][0] = 100;
        colors.direction[1] = -1;
        colors.momentum[1] *= colors.momentumReduction;
    } else if (colors.hsl[1][0] < 30) {
        colors.hsl[1][0] = 30;
        colors.direction[1] = 1;
        colors.momentum[1] *= colors.momentumReduction;
    }


    if (colors.hsl[2][0] > 70){
        colors.hsl[2][0] = 70;
        colors.direction[2] = -1;
        colors.momentum[2] *= colors.momentumReduction;
    } else if (colors.hsl[2][0] < 30) {
        colors.hsl[2][0] = 30;
        colors.direction[2] = 1;
        colors.momentum[2] *= colors.momentumReduction;
    }
}
