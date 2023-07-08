class Boss {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = Math.random() > 0.5 ? 850 : -50
        this.y = Math.random() > 0.5 ? 650 : -50
        this.w = 50;
        this.h = 50;

        this.vx = 1;
        this.vy = 1;

        this.sprite = new Image();
        this.sprite.src = "/assets/img/flyanim.png"
        this.sprite.horizontalFrames = 4;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;

        this.isKilled = false;

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
                if (DEBUG) {
                Utils.drawDebugRect(this.ctx, this.x, this.y, this.w, this.h)
            }
        }
    
    }

    move(isaac) {
        if (isaac.x > this.x) {
            this.x += ENEMY_SPEED;
        } else if (isaac.x < this.x) {
            this.x -= ENEMY_SPEED
        } 

        if (isaac.y > this.y) {
            this.y += ENEMY_SPEED;
        } else if (isaac.y < this.y) {
            this.y -= ENEMY_SPEED
        } 
    }

    killed() {
        this.isKilled = !this.isKilled;
    }

}