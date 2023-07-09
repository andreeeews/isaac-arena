class EnemyBullet {
    constructor(ctx, x, y, vx, vy) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = BULLET_SPEED * vx;
        this.vy = BULLET_SPEED * vy;
        this.r = 3;

        this.shouldRemove = false;
        this.isKilled = false;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fillStyle = "black";
        this.ctx.fill();
        this.ctx.closePath();
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