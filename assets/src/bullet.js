class Bullet {
    constructor(ctx, x, y, direction) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = BULLET_SPEED;
        this.vy = BULLET_SPEED;
        this.ax = 0.02
        this.ay = 0.02
        this.r = 3;

        this.direction = direction;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
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
        }
        
        
        
        
        
    }
