class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.drawIntervalId = undefined;
    this.fps = 60;

    this.background = new Background(this.ctx);
    this.isaac = new Isaac(this.ctx, 400 - 20, 300 - 40);
    this.enemies = [];
    this.tick = 0;
    this.tickEnemyShoot = 0;
    this.scoreLevelUp = 0;
    this.spawnCheck = 0;
    this.spawnBoss = false;

    this.startTheme = new Audio("./assets/sounds/start_music.webm");
    this.basementTheme = new Audio("./assets/sounds/basement_theme.webm");
    this.playerDeath = new Audio("./assets/sounds/playerdeath.wav");
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
    setTimeout(() => {
      this.basementTheme.volume = 0.02;
      this.basementTheme.play();
    }, 2000);

    this.drawIntervalId = setInterval(() => {
      this.clear();
      this.move();
      this.draw();
      this.checkCollisions();
      this.clearEnemy();
      this.levelUp();
      this.addEnemy();
      this.shootEnemy();
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
      if (this.spawnCheck < 32) {
        this.spawnCheck++;
        this.enemies.push(new Enemy(this.ctx));
      } else if (!this.spawnBoss) {
        ENEMY_SHOTINTERVAL = 50;
        this.enemies.push(new Boss(this.ctx));
        this.spawnBoss = true;
      }
    }
  }

  shootEnemy() {
    this.tickEnemyShoot++;

    if (this.tickEnemyShoot > ENEMY_SHOTINTERVAL) {
      this.tickEnemyShoot = 0;
      this.enemies.forEach((enemy) => {
        if (true) {
          enemy.shoot(this.isaac);
        }
      });
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

    this.enemies.forEach((enemy) => {
      enemy.draw();
    });
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.height);
  }

  checkCollisions() {
    const player = this.isaac;

    this.enemies.forEach((e) => {
      const colx =
        player.x + (player.w - 20) >= e.x && player.x < e.x + (e.w - 20);
      const coly = player.y + (player.h - 10) >= e.y && player.y < e.y + e.h;

      if (colx && coly) {
        this.playerDeath.volume = 0.1;
        this.playerDeath.play();
        this.gameOver();
      }
    });

    player.weapon.bullets.forEach((bullet) => {
      this.enemies.forEach((enemy) => {
        bullet.collideWith(enemy);
      });
    });

    this.enemies.forEach((enemy) => {
      enemy.bullets.forEach((bullet) => {
        bullet.collideWithIsaac(player);
      });
    });
  }

  clearEnemy() {
    this.enemies = this.enemies.filter((enemy) => {
      if (enemy.isKilled) {
        this.scoreLevelUp += 1;
        console.log(this.scoreLevelUp);
      }
      return !enemy.isKilled;
    });
  }

  gameOver() {
    const image = new Image();
    image.src = "./assets/img/defeat.png";

    const self = this; // Guarda una referencia al objeto actual para usarla dentro de la función onload

    image.onload = function () {
      const scaleWidth = image.width * 0.4;
      const scaleHeight = image.height * 0.4;
      self.ctx.drawImage(image, 60, 250, scaleWidth, scaleHeight); // Utiliza self.ctx en lugar de image.ctx
    }

    this.stop();

    setTimeout(() => {
      location.reload();
    }, 10000);
  }

  levelUp() {
    if (this.scoreLevelUp <= 6) {
      this.ctx.font = "24px Impact";
      this.ctx.fillStyle = "red";
      this.ctx.fillText(`LEVEL 1 (${this.scoreLevelUp}/6)`, 10, 30);
    } else if (this.scoreLevelUp <= 12) {
      this.ctx.font = "24px Impact";
      this.ctx.fillStyle = "red";
      this.ctx.fillText(`LEVEL 2 (${this.scoreLevelUp}/12)`, 10, 30);
    } else if (this.scoreLevelUp <= 18) {
      this.ctx.font = "24px Impact";
      this.ctx.fillStyle = "red";
      this.ctx.fillText(`LEVEL 3 (${this.scoreLevelUp}/18)`, 10, 30);
    } else if (this.scoreLevelUp <= 24) {
      this.ctx.font = "24px Impact";
      this.ctx.fillStyle = "red";
      this.ctx.fillText(`LEVEL 4 (${this.scoreLevelUp}/24)`, 10, 30);
    } else if (this.scoreLevelUp <= 32) {
      this.ctx.font = "24px Impact";
      this.ctx.fillStyle = "red";
      this.ctx.fillText(`LAST LEVEL! FIGTH TILL THE END!`, 10, 30);
    } else if (this.scoreLevelUp === 33) {
      this.finisGame();
    }
  }

  finisGame() {
    const image = new Image();
    image.src = "./assets/img/win.png";

    const self = this; // Guarda una referencia al objeto actual para usarla dentro de la función onload

    image.onload = function () {
      const scaleWidth = image.width * 0.4;
      const scaleHeight = image.height * 0.4;
      self.ctx.drawImage(image, 20, 250, scaleWidth, scaleHeight); // Utiliza self.ctx en lugar de image.ctx
    };

    this.stop();

    setTimeout(() => {
      location.reload();
    }, 10000);
  }
}
