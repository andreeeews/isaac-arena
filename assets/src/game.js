class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.drawIntervalId = undefined;
    this.fps = 60;

    this.background = new Background(this.ctx);
    this.isaac = new Isaac(this.ctx, 400 - 20, 300 - 40);
    // -20 es el el resultado del ancho del persona-el ancho del escenario, los mismo para 40.
    this.enemies = [];
    //this.audio
    this.tick = 0;
    this.scoreLevelUp = 0;
  }

  onKeyEvent(event) {
    const { type, keyCode } = event;
    switch (type) {
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
      this.clearEnemy();
      this.levelUp();
      this.addEnemy();
    }, 1000 / this.fps);
  }

  stop() {
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = undefined;
  }

  addEnemy() {
    this.tick++;

    if (this.tick > ENEMY_FREQUENCY && this.enemies.length < MAX_ENEMY) {
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
    this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.height);
  }

  checkCollisions() {
    const player = this.isaac;
    this.isaac;

    this.enemies.forEach((e) => {
      const colx =
        player.x + (player.w - 20) >= e.x && player.x < e.x + (e.w - 20);
      const coly = player.y + (player.h - 10) >= e.y && player.y < e.y + e.h;

      if (colx && coly) {
        this.gameOver();
      }
    });

    player.weapon.bullets.forEach((bullet) => {
      this.enemies.forEach((enemy) => {
        bullet.collideWith(enemy);
      });
    });
  }

  clearEnemy() {
    this.enemies = this.enemies.filter((enemy) => {
      if (enemy.isKilled) {
        this.scoreLevelUp += 1;
      }
      return !enemy.isKilled;
    });
  }

  gameOver() {
    this.stop();
    this.ctx.fillStyle = "black";
    this.ctx.font = "bold 70px Impact";
    this.ctx.fillText("¡Has perdido!", 150, this.canvas.height / 2);

    setTimeout(() => {
      location.reload();
    }, 3000);
  }

  levelUp() {
    if (this.scoreLevelUp === 0) {
      this.ctx.font = "24px Impact";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("LEVEL 1", 372, 30);
      
    } else if (this.scoreLevelUp === 1) {
      this.ctx.font = "24px Impact";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("LEVEL 2", 372, 30);

    } else if (this.scoreLevelUp === 2) {
      this.ctx.font = "24px Impact";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("LEVEL 3", 372, 30);

    } else if (this.scoreLevelUp === 3) {
      this.ctx.font = "24px Impact";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("LEVEL 3", 372, 30);

    } else if (this.scoreLevelUp === 4) {
      this.ctx.font = "24px Impact";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("LEVEL 4", 372, 30);

    } else if (this.scoreLevelUp === 5) {
      this.ctx.font = "24px Impact";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("LAST LEVEL! BOSS TIME!", 300, 30);

    } else if (this.scoreLevelUp === 6) {
      this.ctx.font = "24px Impact";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("YOU WIN!", 300, 30);
      this.stop();

      setTimeout(() => {
        location.reload();
      }, 3000);
    }
  }
}
