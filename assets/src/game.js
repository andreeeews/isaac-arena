class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext("2d")

        this.drawIntervalId = undefined
        this.fps = 60

        this.background = new Background(this.ctx);
        this.isaac = new Isaac(this.ctx, 0, 0)
        
        //this.audio

        this.tick = 0;
    }

    onKeyEvent(event) {
        const { type, keyCode } = event;
        switch(type) {
          case "keydown":
            this.isaac.onKeyDown(keyCode);
            break;
          case "keyup":
            this.isaac.onKeyUp(keyCode);
            break;
        } 
      }

    start() {
        this.drawIntervalId = setInterval(() => {
            this.clear();
            this.draw();
            this.move();

        }, 1000 / this.fps);
    }

    draw() {
        this.background.draw();
        this.isaac.draw();
    }

    move() {
        this.isaac.move();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.height)
    }










}