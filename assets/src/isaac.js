class Isaac {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = 30*2;
        this.h = 30*2;

        this.vx = 0;
        this.vy = 0;

        this.weapon = new Weapon(this.ctx, this.x + this.w, this.y + this.h / 2);

        this.shooting = null

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
            if (DEBUG) {
                Utils.drawDebugRect(this.ctx, this.x, this.y, this.w, this.h)
            }
        }

        this.weapon.draw();
    }

    onKeyDown(keyCode) {
        switch(keyCode) {
            case KEY_UP:
                this.vy = -PLAYER_SPEED
                break;
            case KEY_DOWN:
                this.vy = PLAYER_SPEED
                break;
            case KEY_RIGHT:
                this.vx = PLAYER_SPEED
                break;
            case KEY_LEFT:
                this.vx = -PLAYER_SPEED
                break;
            case FIRE_RIGHT:
                this.shooting  = 'right'
                break;
            case FIRE_LEFT:
                this.shooting  = 'left';
                break;
            case FIRE_UP:
                this.shooting  = 'up';
                break;
            case FIRE_DOWN:
                this.shooting  = 'down';
                break;
        }
    }

    onKeyUp(keyCode) {
        switch(keyCode) {
            case FIRE_RIGHT:
            case FIRE_LEFT:
            case FIRE_UP:
            case FIRE_DOWN:
                this.shooting = null;
                break;
            case KEY_UP:
                this.vy = 0
                break;
            case KEY_DOWN:
                this.vy = 0
                break;
            case KEY_LEFT:
            case KEY_RIGHT:
                this.vx = 0
                break;
        }
    }
    
    move() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.w > this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.w
        };

        if (this.y < 0) {
            this.y = 0;
        } else if (this.y + this.h > this.ctx.canvas.height) {
            this.y = this.ctx.canvas.height - this.h;
        };

        if (this.shooting) {
            this.weapon.shoot(this.shooting)
        }

        this.weapon.x = this.x + this.w / 2;
        this.weapon.y = this.y + this.h / 2;

        this.weapon.move();
    }

    collideWith(element) {
        return (
            this.x + this.w > element.x &&
            this.x < element.x + element.w &&
            this.y + this.h > element.y &&
            this.y < element.y + element.h
        )
    }
}