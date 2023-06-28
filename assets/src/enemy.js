class Enemy {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = 60;
        this.h = 40;

        this.vx = 0;
        this.vy = 0;

        this.sprite = new Image();
        this.sprite.src = "/assets/img/flyanim.png"
        this.sprite.horizontalFrames = 4;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;

        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(
                this.sprite.width / this.sprite.horizontalFrames
            );
            this.sprite.frameHeight = Math.floor(
                this.sprite.height / this.sprite.verticalFrames
            );
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
            )
        }
    }

    move() {
        this.speed = 2
        
        
        this.vx = 1
        this.vy = 1
    }
}