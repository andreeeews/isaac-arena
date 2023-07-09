class Boss {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = Math.random() > 0.5 ? 850 : -50;
    this.y = Math.random() > 0.5 ? 650 : -50;
    this.w = 50 * 2;
    this.h = 50 * 2;

    this.vx = 0;
    this.vy = 0;

    this.sprite = new Image();
    this.sprite.src = "/assets/img/dukeswarmanim.png";
    this.sprite.horizontalFrames = 7;
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.verticalFrames = 1;
    this.sprite.verticalFrameIndex = 0;

    this.maxHealth = 5;
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

  shoot(direction) {
    this.tick++
    
    if (this.tick > 10) {
    const newEnemyBullet = new EnemyBullet(this.ctx, this.x, this.y, direction);
    this.enemyBullets.push(newEnemyBullet);
    this.tick = 0
    }
}

  draw() {
    if (this.sprite.isReady) {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
        this.sprite.verticalFrameIndex * this.sprite.frameWidth,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        this.x,
        this.y,
        this.w,
        this.h
      );

      if (DEBUG) {
        Utils.drawDebugRect(this.ctx, this.x, this.y, this.w, this.h);
      }
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
  }

  killed() {
    this.isKilled = true;
  }
}
