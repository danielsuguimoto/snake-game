const BOX_SIZE = 20;
const BOX_COUNT = 30;
const DIRECTION_RIGHT = 'right';
const DIRECTION_LEFT = 'left';
const DIRECTION_UP = 'up';
const DIRECTION_DOWN = 'down';
const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_DOWN = 40;

const canvas = document.getElementById('app'),
    context = canvas.getContext('2d');

let direction = null,
    food = null,
    snake = null,
    game = null;

function moveSnake (event) {
    if (event.keyCode === KEY_LEFT && direction !== DIRECTION_RIGHT) {
        direction = DIRECTION_LEFT;
    }

    if (event.keyCode === KEY_UP && direction !== DIRECTION_DOWN) {
        direction = DIRECTION_UP;
    }

    if (event.keyCode === KEY_RIGHT && direction != DIRECTION_LEFT) {
        direction = DIRECTION_RIGHT;
    }

    if (event.keyCode === KEY_DOWN && direction != DIRECTION_UP) {
        direction = DIRECTION_DOWN;
    }
}

function drawSnake () {
    snake.forEach(part => {
        context.fillStyle = "lightgreen";
        context.fillRect(part.x, part.y, BOX_SIZE, BOX_SIZE);
    })
};

function drawFood () {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, BOX_SIZE, BOX_SIZE);
};

function clearCanvas(){
    context.fillStyle = "black";
    context.fillRect(0, 0, BOX_COUNT * BOX_SIZE, BOX_COUNT * BOX_SIZE);
};

function isGameOver () {
    if (snake[0].x > (BOX_COUNT - 1) * BOX_SIZE && direction === DIRECTION_RIGHT) {
        return true;
    }

    if (snake[0].x < 0 && direction === DIRECTION_LEFT) {
        return true;
    }

    if (snake[0].y > (BOX_COUNT - 1) * BOX_SIZE && direction === DIRECTION_DOWN) {
        return true;
    }

    if (snake[0].y < 0 && direction === DIRECTION_UP) {
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
        return;
    }

    clearCanvas();
    drawSnake();
    drawFood();

    let newHead = {
        ...snake[0],
    };

    if (direction === DIRECTION_RIGHT) {
        newHead.x += BOX_SIZE;
    }

    if (direction === DIRECTION_LEFT) {
        newHead.x -= BOX_SIZE;
    }

    if (direction === DIRECTION_UP) {
        newHead.y -= BOX_SIZE;
    }

    if (direction === DIRECTION_DOWN) {
        newHead.y += BOX_SIZE;
    }

    snake.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
        food.x = Math.floor(Math.random() * (BOX_COUNT - 1) +1) * BOX_SIZE;
        food.y = Math.floor(Math.random() * (BOX_COUNT - 1) +1) * BOX_SIZE;
    } else {
        snake.pop();
    }
};

function start () {
    direction = DIRECTION_RIGHT;
    food = {
        x: Math.floor(Math.random() * (BOX_COUNT - 1) + 1) * BOX_SIZE,
        y: Math.floor(Math.random() * (BOX_COUNT - 1) + 1) * BOX_SIZE
    };
    snake = [{
        x: (BOX_COUNT / 2) * BOX_SIZE,
        y: (BOX_COUNT / 2) * BOX_SIZE,
    }];
    game = setInterval(play, 100);
};

document.addEventListener('keydown', moveSnake);