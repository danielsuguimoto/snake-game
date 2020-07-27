const canvas = document.getElementById('app'),
    context = canvas.getContext('2d'),
    boxSize = 20;

let direction = null,
    food = null,
    snake = null,
    game = null;

function moveSnake (event) {
    if (event.keyCode == 37 && direction != 'right') {
        direction = 'left';
    }

    if (event.keyCode == 38 && direction != 'down') {
        direction = 'up';
    }

    if (event.keyCode == 39 && direction != 'left') {
        direction = 'right';
    }

    if (event.keyCode == 40 && direction != 'up') {
        direction = 'down';
    }
}

function drawSnake () {
    snake.forEach(part => {
        context.fillStyle = "lightgreen";
        context.fillRect(part.x, part.y, boxSize, boxSize);
    })
};

function drawFood () {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, boxSize, boxSize);
};

function drawBG(){
    context.fillStyle = "black";
    context.fillRect(0, 0, 30 * boxSize, 30 * boxSize);
};

function isGameOver () {
    if (snake[0].x > 29 * boxSize && direction === "right") {
        return true;
    }

    if (snake[0].x < 0 && direction === 'left') {
        return true;
    }

    if (snake[0].y > 29 * boxSize && direction === "down") {
        return true;
    }

    if (snake[0].y < 0 && direction === 'up') {
        return true;
    }

    for (let i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            return true;
        }
    }

    return false;
}

function play () {
    if (isGameOver()) {
        clearInterval(game);
        alert('Game Over');
    }

    drawBG();
    drawSnake();
    drawFood();

    let newHead = {
        ...snake[0],
    };

    if (direction === "right") {
        newHead.x += boxSize;
    }

    if (direction === "left") {
        newHead.x -= boxSize;
    }

    if (direction === "up") {
        newHead.y -= boxSize;
    }

    if (direction === "down") {
        newHead.y += boxSize;
    }

    snake.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
        food.x = Math.floor(Math.random() * 29 +1) * boxSize;
        food.y = Math.floor(Math.random() * 29 +1) * boxSize;
    } else {
        snake.pop();
    }
};

function start () {
    direction = 'right';
    food = {
        x: Math.floor(Math.random() * 29 + 1) * boxSize,
        y: Math.floor(Math.random() * 29 + 1) * boxSize
    };
    snake = [{
        x: 15 * boxSize,
        y: 15 * boxSize,
    }];
    game = setInterval(play, 100);
};

document.addEventListener('keydown', moveSnake);