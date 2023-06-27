class Isaac {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = 40;
        this.h = 70;

        this.vx = 0;
        this.vy = 0;

        this.sprite = new Image();
        this.sprite.src = "/assets/img/isaac-sprite.png"
        this.sprite.horizontalFrames = 1
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrames = 4
        this.sprite.verticalFrameIndex = 0

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
                this.h,
            )
        }
    }

    onKeyDown(keyCode) {
        switch(keyCode) {
            case KEY_UP:
                this.vy = -10
                break;
            case KEY_DOWN:
                this.vy = 10
                break;
            case KEY_RIGHT:
                this.vx = 10
                break;
            case KEY_LEFT:
                this.vx = -10
                break;
        }
    }

    onKeyUp(keyCode) {
        switch(keyCode) {
            case KEY_UP:
                this.vy = 0
                break;
            case KEY_DOWN:
                this.vy = 0
                break;
            case KEY_RIGHT:
                this.vx = 0
                break;
            case KEY_LEFT:
                this.vx = 0
                break;
        }
    }
    
    move() {
        this.x += this.vx;
        this.y += this.vy;
    }
}