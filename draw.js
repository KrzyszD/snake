
function square(x, y, size, color, scale) {
    if (scale !== 0){
        var offset = (tileSize - squareSize * scale) / 2;
        x += offset;
        y += offset;
        size *= scale
    }
    context.beginPath();
    context.rect(x, y, size, size);
    context.fillStyle = color;
    context.fill();
}

function drawFood() {
    for (var i = 0; i < numFood; i++){
        var foodX = foods[i][0];
        var foodY = foods[i][1];
        square(foodX *  tileSize, foodY *  tileSize,  squareSize, "white", 1);
    }
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
