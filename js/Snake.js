const DIRECTION_RIGHT = 'right';
const DIRECTION_LEFT = 'left';
const DIRECTION_UP = 'up';
const DIRECTION_DOWN = 'down';

class SnakeBodyPart {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }
};

export default class Snake {
    constructor (headX, headY) {
        this._direction = undefined;
        this._body = [
            new SnakeBodyPart(headX, headY),
        ];
    }

    get goingLeft () {
        return this._direction === DIRECTION_LEFT;
    }

    get goingRight () {
        return this._direction === DIRECTION_RIGHT;
    }

    get goingUp () {
        return this._direction === DIRECTION_UP;
    }

    get goingDown () {
        return this._direction === DIRECTION_DOWN;
    }

    get head () {
        return this._body[0];
    }

    get size () {
        return this._body.length;
    }

    at (index) {
        return this._body[index];
    }

    move () {
        const newHead = new SnakeBodyPart(this.head.x, this.head.y);

        if (this.goingRight) {
            newHead.x += 1;
        }

        if (this.goingLeft) {
            newHead.x -= 1;
        }

        if (this.goingUp) {
            newHead.y -= 1;
        }

        if (this.goingDown) {
            newHead.y += 1;
        }

        this._body.unshift(newHead);
    }

    removeTail () {
        this._body.pop();
    }

    goLeft () {
        if (this._direction === DIRECTION_RIGHT) {
            return;
        }

        this._direction = DIRECTION_LEFT;
    }

    goRight () {
        if (this._direction === DIRECTION_LEFT) {
            return;
        }

        this._direction = DIRECTION_RIGHT;
    }

    goUp () {
        if (this._direction === DIRECTION_DOWN) {
            return;
        }

        this._direction = DIRECTION_UP;
    }

    goDown () {
        if (this._direction === DIRECTION_UP) {
            return;
        }

        this._direction = DIRECTION_DOWN;
    }

    each(callback) {
        this._body.forEach(callback);
    }
};
