import Snake from './Snake.js';
import Food from './Food.js';

const SNAKE_COLOR = 'lightgreen';
const CANVAS_COLOR = 'black';
const FOOD_COLOR = 'red';

const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_DOWN = 40;

export default class Game {
    constructor (canvas) {
        this.canvas = canvas;
        this.init();

        document.addEventListener('keydown', event => {
            switch (event.keyCode) {
                case KEY_LEFT:
                    return this.snake.goLeft();
                case KEY_UP:
                    return this.snake.goUp();
                case KEY_RIGHT:
                    return this.snake.goRight();
                case KEY_DOWN:
                    return this.snake.goDown();
            }
        })
    }

    get gameOver () {
        if (this.snake.head.x > this.canvas.blocksPerRow - 1 && this.snake.goingRight) {
            return true;
        }

        if (this.snake.head.x < 0 && this.snake.goingLeft) {
            return true;
        }

        if (this.snake.head.y > this.canvas.blocksPerRow - 1 && this.snake.goingDown) {
            return true;
        }

        if (this.snake.head.y < 0 && this.snake.goingUp) {
            return true;
        }

        for (let i = 1; i < this.snake.size; i++){
            if (this.snake.head.x == this.snake.at(i).x && this.snake.head.y == this.snake.at(i).y) {
                return true;
            }
        }

        return false;
    }

    init () {
        const boardMiddle = this.canvas.blocksPerRow / 2;
        this.snake = new Snake(boardMiddle, boardMiddle);
        this.snake.goRight();
        this.food = new Food(this.canvas.blocksPerRow);
        this.game = undefined;
    }

    tick () {
        if (this.gameOver) {
            clearInterval(this.game);
            alert('Game Over');
            return;
        }

        this.canvas.fill(CANVAS_COLOR);
        this.canvas.drawBlock(this.food.x, this.food.y, FOOD_COLOR);
        this.snake.each(part => this.canvas.drawBlock(part.x, part.y, SNAKE_COLOR));

        this.snake.move();

        if (this.snake.head.x === this.food.x && this.snake.head.y === this.food.y) {
            this.food.randomPosition();
        } else {
            this.snake.removeTail();
        }
    }

    start () {
        this.init();
        this.game = setInterval(() => this.tick(), 100);
    }
};
