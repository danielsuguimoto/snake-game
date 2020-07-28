import Game from './Game.js';
import Canvas from './Canvas.js';

(function () {
    const canvas = new Canvas(document.getElementById('app'), 20, 30),
        game = new Game(canvas);

    window.game = game;
})();
