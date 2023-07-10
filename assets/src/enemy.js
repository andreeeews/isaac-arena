class Enemy {
    constructor(ctx) {
      this.ctx = ctx;
      this.x = Math.random() > 0.5 ? 820 : -20;
      this.y = Math.random() > 0.5 ? 620 : -20;
      this.w = 50/1.3;
      this.h = 50/1.3;
      this.vx = 0; // Componente x de la velocidad actual
      this.vy = 0; // Componente y de la velocidad actual
  
      this.bullets = [];
  
      this.animationTick = 0;
      this.sprite = new Image();
      this.sprite.src = "/assets/img/flyanim.png";
      this.sprite.horizontalFrames = 4;
      this.sprite.horizontalFrameIndex = 0;
      this.sprite.verticalFrames = 1;
      this.sprite.verticalFrameIndex = 0;
  
      this.flyAudio = new Audio("/assets/sounds/MOSCA.wav");
      this.flyAudio.volume = 1;
  
      this.maxHealth = 2;
      this.health = this.maxHealth;
      this.isKilled = false;
  
      this.sprite.onload = () => {
        this.sprite.isReady = true;
        this.sprite.frameWidth = Math.floor(
          this.sprite.width / this.sprite.horizontalFrames
        );
        this.sprite.frameHeight = Math.floor(
          this.sprite.height / this.sprite.verticalFrames
        );
      };
    }
  
    draw() {
      if (this.sprite.isReady) {
        this.ctx.drawImage(
          this.sprite,
          this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
          this.sprite.verticalFrameIndex * this.sprite.frameHeight,
          this.sprite.frameWidth,
          this.sprite.frameHeight,
          this.x,
          this.y,
          this.w,
          this.h
        );
  
        const barWidth = 40;
        const barHeight = 5;
        const barX = this.x + this.w / 2 - barWidth / 2;
        const barY = this.y + this.h + 5;
        const healthPercentage = this.health / this.maxHealth;
        const barFillWidth = barWidth / healthPercentage;
        this.ctx.fillStyle = "gray";
        this.ctx.fillRect(barX, barY, barWidth, barHeight);
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(barX, barY, barFillWidth, barHeight);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(barX, barY, barWidth, barHeight);
  
        if (DEBUG) {
          Utils.drawDebugRect(this.ctx, this.x, this.y, this.w, this.h);
        }
  
        this.animation();
  
        this.bullets.forEach((bullet) => bullet.draw());
        this.flyAudio.play();
      }
    }
  
    move(isaac) {
      const dx = isaac.x - this.x;
      const dy = isaac.y - this.y;
  
      const angle = Math.atan2(dy, dx);
  
      const targetSpeed = ENEMY_SPEED;
      const vx = Math.cos(angle) * targetSpeed;
      const vy = Math.sin(angle) * targetSpeed;
  
      const easing = 0.1;
  
      const interpolatedVx = this.vx + (vx - this.vx) * easing;
      const interpolatedVy = this.vy + (vy - this.vy) * easing;
  
      this.x += interpolatedVx;
      this.y += interpolatedVy;
  
      this.bullets.forEach((bullet) => bullet.move());
    }
  
    shoot(isaac) {
      let vx = 0;
      let vy = 0;
      if (isaac.x > this.x + this.w) {
        vx = ENEMY_BULLETSPEED;
      } else if (isaac.x + isaac.w < this.x) {
        vx = -ENEMY_BULLETSPEED;
      }
  
      if (isaac.y > this.y + this.h) {
        vy = ENEMY_BULLETSPEED;
      } else if (isaac.y + isaac.h < this.y) {
        vy = -ENEMY_BULLETSPEED;
      }
      const newEnemyBullet = new EnemyBullet(
        this.ctx,
        this.x + 25,
        this.y + 30,
        vx,
        vy
      );
      this.bullets.push(newEnemyBullet);
    }
  
    killed() {
      this.isKilled = true;
    }
  
    animation() {
      this.animationTick++;
  
      if (this.animationTick > 5) {
        this.animationTick = 0;
        this.sprite.horizontalFrameIndex++;
  
        if (
          this.sprite.horizontalFrameIndex >
          this.sprite.horizontalFrames - 1
        ) {
          this.sprite.horizontalFrameIndex = 0;
        }
      }
    }
  }
  
  class Boss extends Enemy {
    constructor(ctx) {
      super(ctx);
  
      this.w = 50 * 2;
      this.h = 50 * 2;
  
      this.bossSprite = new Image();
      this.bossSprite.src = "/assets/img/dukeswarmanim.png";
      this.bossSprite.horizontalFrames = 7;
      this.bossSprite.horizontalFrameIndex = 0;
      this.bossSprite.verticalFrames = 1;
      this.bossSprite.verticalFrameIndex = 0;
  
      this.maxHealth = 15;
      this.health = this.maxHealth;
      this.isKilled = false;
      this.isSpawned = false;
  
      const self = this;
  
      this.bossSprite.onload = function () {
        self.bossSprite.isReady = true;
        self.bossSprite.frameWidth = Math.floor(
          self.bossSprite.width / self.bossSprite.horizontalFrames
        );
        self.bossSprite.frameHeight = Math.floor(
          self.bossSprite.height / self.bossSprite.verticalFrames
        );
      };
  
      this.bossSprite.src = "/assets/img/dukeswarmanim.png";
    }
  
    draw() {
      if (this.bossSprite.isReady) {
        this.ctx.drawImage(
          this.bossSprite,
          this.bossSprite.horizontalFrameIndex * this.bossSprite.frameWidth,
          this.bossSprite.verticalFrameIndex * this.bossSprite.frameHeight,
          this.bossSprite.frameWidth,
          this.bossSprite.frameHeight,
          this.x,
          this.y,
          this.w,
          this.h
        );
  
        const barWidth = 40;
        const barHeight = 5;
        const barX = this.x + this.w / 2 - barWidth / 2;
        const barY = this.y + this.h + 5;
        const healthPercentage = this.health / this.maxHealth;
        const barFillWidth = barWidth / healthPercentage;
        this.ctx.fillStyle = "gray";
        this.ctx.fillRect(barX, barY, barWidth, barHeight);
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(barX, barY, barFillWidth, barHeight);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(barX, barY, barWidth, barHeight);
  
        if (DEBUG) {
          Utils.drawDebugRect(this.ctx, this.x, this.y, this.w, this.h);
        }
  
        this.animation();
  
        this.bullets.forEach((bullet) => bullet.draw());
        this.flyAudio.play();
      }
    }
    
  
    shoot() {
      const bulletSpeed = 1;
      const diagonalSpeed = bulletSpeed / Math.sqrt(2);
  
      this.createBullet(0, -1, bulletSpeed);
      this.createBullet(1, -1, diagonalSpeed);
      this.createBullet(1, 0, bulletSpeed);
      this.createBullet(1, 1, diagonalSpeed);
      this.createBullet(0, 1, bulletSpeed);
      this.createBullet(-1, 1, diagonalSpeed);
      this.createBullet(-1, 0, bulletSpeed);
      this.createBullet(-1, -1, diagonalSpeed);
    }
  
    createBullet(vx, vy, speed) {
      const newEnemyBullet = new EnemyBullet(this.ctx, this.x+60, this.y + 45, vx, vy, speed);
      this.bullets.push(newEnemyBullet);
    }

    animation() {
      this.animationTick++;
  
      if (this.animationTick > 13) {
        this.animationTick = 0;
        this.bossSprite.horizontalFrameIndex++;
  
        if (
          this.bossSprite.horizontalFrameIndex >
          this.bossSprite.horizontalFrames - 1
        ) {
          this.bossSprite.horizontalFrameIndex = 0;
        }
      }
    }
  }

