class Bullet {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = BULLET_SPEED;
        this.vy = BULLET_SPEED;
        this.ax = 0.02
        this.ay = 0.02
        this.r = 3;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    move() {
        this.vx += this.ax;
        this.x += this.vx;
        //this.y += this.vy;
    }
}