export default class Food {
    constructor (boardSize) {
        this.boardSize = boardSize;
        this.randomPosition();
    }

    randomPosition () {
        this.x = Math.floor(Math.random() * (this.boardSize - 1) + 1);
        this.y = Math.floor(Math.random() * (this.boardSize - 1) + 1);
    }
};
