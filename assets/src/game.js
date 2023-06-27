class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext("2d")

        this.drawIntervalId = undefined
        this.fps = 60

        this.background = new Background(this.ctx);
        //this.isaac
        
        //this.audio

        this.tick = 0;
    }

    start() {
        this.drawIntervalId = setInterval(() => {
            this.clear();
            this.draw();

        }, 1000, this.fps);
    }

    draw() {
        this.background.draw()
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.height)
    }










}