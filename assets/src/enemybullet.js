class EnemyBullet {
    constructor(ctx, x, y, vx, vy) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.vx = BULLET_SPEED * vx;
      this.vy = BULLET_SPEED * vy;
      this.r = 5;
  
      this.shouldRemove = false;
      this.isKilled = false;
  
      this.image = new Image();
      this.image.src = "/assets/img/enemybullet.png";
    }
  
    draw() {
      this.ctx.drawImage(this.image, this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
    }
  

    move() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.y < 0 || this.x > this.ctx.canvas.width || this.y > this.ctx.canvas.height) { 
            this.shouldRemove = true
        }
    };

    collideWithIsaac(isaac) {
        if (
            this.x < isaac.x + isaac.w &&
            this.x + this.r > isaac.x &&
            this.y < isaac.y + isaac.h &&
            this.y + this.r > isaac.y
          ) {
            this.impactSound("/assets/sounds/impact.wav");
            this.shouldRemove = true;
            game.gameOver();
          }
    }

    impactSound (sound) {
        const audio = new Audio(sound);
        audio.play();
    }
}