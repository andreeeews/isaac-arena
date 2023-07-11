class Weapon {
    constructor(ctx, x, y) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.isShooting = false;
      this.lastShootTime = 0;
      this.bullets = [];
    }
  
    shoot(direction) {
      if (!this.isShooting) {
        const currentTime = Date.now();
        const elapsedTime = currentTime - this.lastShootTime;
  
        if (elapsedTime > SHOOT_INTERVAL) {
          const newBullet = new Bullet(this.ctx, this.x, this.y, direction);
          this.bullets.push(newBullet);
          this.fireSound("/assets/sounds/FIRE.wav");
          this.lastShootTime = currentTime;
        }
      }
    }
  
    draw() {
      this.bullets.forEach((bullet) => {
        bullet.draw();
      });
  
      this.bullets = this.bullets.filter((b) => !b.shouldRemove);
    }
  
    move() {
      this.bullets.forEach((bullet) => {
        bullet.move();
      });
    }
  
    fireSound(sound) {
      const audio = new Audio(sound);
      audio.play();
    }
  }