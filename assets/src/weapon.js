class Weapon {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.tick = 0
        this.bullets = [];
        
    }

    shoot(direction) {
        this.tick++
        
        if (this.tick > 10) {
        const newBullet = new Bullet(this.ctx, this.x, this.y, direction);
        this.bullets.push(newBullet);
        this.tick = 0
        }
    }

    draw() {
        
        this.bullets.forEach((bullet) => {
            bullet.draw();
        })
        
        this.bullets = this.bullets.filter((b) => !b.shouldRemove)
        //console.log(this.bullets)
    };

    move() {
        this.bullets.forEach((bullet) => {
            bullet.move();
        });
    }
}