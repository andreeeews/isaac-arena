class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext("2d")

        this.drawIntervalId = undefined
        this.fps = 60

        this.background = new Background(this.ctx);
        this.isaac = new Isaac(this.ctx, 400-20, 300-40);
        // -20 es el el resultado del ancho del persona-el ancho del escenario, los mismo para 40.
        this.enemy = new Enemy(this.ctx);
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
            this.move();
            this.draw();
            this.checkCollisions()
        }, 1000 / this.fps);
    }

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
    }

    draw() {
        this.background.draw();
        this.isaac.draw();
        this.enemy.draw();
    }

    move() {
        this.isaac.move();
        this.enemy.move(this.isaac);
        
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.height)
    }

    checkCollisions() {
        if (this.isaac.collideWith(this.enemy)) {
            this.gameOver();
        }
    }

    gameOver() {
        this.stop();
    }










}