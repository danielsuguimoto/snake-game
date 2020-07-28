export default class Canvas {
    constructor (node, blockSize, blocksPerRow) {
        this.context = node.getContext('2d')
        this.blockSize = blockSize;
        this.blocksPerRow = blocksPerRow;
    }

    get totalWidth () {
        return this.blockSize * this.blocksPerRow;
    }

    drawBlock (x, y, fillStyle) {
        this.context.fillStyle = fillStyle;
        this.context.fillRect(x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
    }

    fill (fillStyle) {
        this.context.fillStyle = fillStyle;
        this.context.fillRect(0, 0, this.totalWidth, this.totalWidth);
    }
};
