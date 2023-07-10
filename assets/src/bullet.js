class Bullet {
    constructor(ctx, x, y, direction) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.vx = BULLET_SPEED;
      this.vy = BULLET_SPEED;
      this.ax = 0.02;
      this.ay = 0.02;
      this.r = 5;
  
      this.direction = direction;
      this.shouldRemove = false;
      this.isKilled = false;
  
      this.image = new Image();
      this.image.src = "/assets/img/bullet.png";
    }
  
    draw() {
      this.ctx.drawImage(this.image, this.x - this.r, this.y - this.r, this.r * 4, this.r * 4);
    }

    move() {
        this.vx += this.ax;
        this.vy += this.ay;

        switch (this.direction) {
            case 'up':
              this.y -= this.vy;
              break;
            case 'down':
              this.y += this.vy;
              break;
            case 'right':
              this.x += this.vx;
              break;
            case 'left':
              this.x -= this.vx;
              break;
          }

        if (this.x < 0 || this.y < 0 || this.x > this.ctx.canvas.width || this.y > this.ctx.canvas.height) { 
            this.shouldRemove = true
        }
    };

    collideWith(enemy) {
        if (
            this.x < enemy.x + enemy.w &&
            this.x + this.r > enemy.x &&
            this.y < enemy.y + enemy.h &&
            this.y + this.r > enemy.y
        ) {
            enemy.maxHealth -= 1
            console.log(enemy.maxHealth)
            if (enemy.maxHealth === 0) {
                console.log("muerto")
                enemy.killed();
            }

            this.impactSound("/assets/sounds/impact.wav")
            this.shouldRemove = true;
        }
    }

    impactSound (sound) {
        const audio = new Audio(sound);
        audio.play();
    }
}
