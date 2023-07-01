class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext("2d")

        this.drawIntervalId = undefined
        this.fps = 60

        this.background = new Background(this.ctx);
        this.isaac = new Isaac(this.ctx, 400-20, 300-40);
        // -20 es el el resultado del ancho del persona-el ancho del escenario, los mismo para 40.
        this.enemies = [];
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
            this.checkCollisions();
            this.addEnemy();
        }, 1000 / this.fps);
    }

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
    }

    addEnemy() {
        this.tick++;

        if (this.tick > 100 && this.enemies.length < 3) {
          this.tick = 0;
          this.enemies.push(new Enemy(this.ctx));
        }
      }
    
    draw() {
        this.background.draw();
        this.isaac.draw();
        this.enemies.forEach((e) => e.draw());
    }

    move() {
        this.isaac.move();
        this.enemies.forEach((e) => e.move(this.isaac));
        
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.height)
    }

    checkCollisions() {
        const player = this.isaac;

        this.enemies.forEach((e) => {
          const colx = player.x + player.w >= e.x && player.x < e.x + e.w;
          const coly = player.y + player.h >= e.y && player.y < e.y + e.h;
    
          if (colx && coly) {
            this.gameOver();
          }
        })

        player.weapon.bullets.forEach((bullet) => {
            this.enemies.forEach(enemy => {
                bullet.collideWith(enemy)
            })
        })

        this.enemies = this.enemies.filter((enemy) => !enemy.isKilled);

        
    }

    gameOver() {
        this.stop();
    }
}