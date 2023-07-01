class Weapon {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;

        this.bullets = [];
        
    }

    shoot(direction) {
        const newBullet = new Bullet(this.ctx, this.x, this.y, direction);
        this.bullets.push(newBullet);
    }

    draw() {
        this.bullets.forEach((bullet) => {
            bullet.draw();
        })
        
        this.bullets = this.bullets.filter((b) => !b.shouldRemove)
        console.log(this.bullets)
    };

    move() {
        this.bullets.forEach((bullet) => {
            bullet.move();
        });
    }
}