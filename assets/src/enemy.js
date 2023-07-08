class Enemy {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = Math.random() > 0.5 ? 850 : -50
        this.y = Math.random() > 0.5 ? 650 : -50
        this.w = 50;
        this.h = 50;

        this.vx = 1;
        this.vy = 1;

        this.animationTick = 0;
        this.sprite = new Image();
        this.sprite.src = "/assets/img/flyanim.png"
        this.sprite.horizontalFrames = 4;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;

        this.flyAudio = new Audio("/assets/sounds/MOSCA.wav")
        this.flyAudio.volume = 1;

        this.maxHealth = 2;
        this.health = this.maxHealth
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

            const barWidth = 40; 
            const barHeight = 5; 
            const barX = this.x + this.w / 2 - barWidth / 2; 
            const barY = this.y + this.h + 5; 
            const healthPercentage = this.health / this.maxHealth;
            const barFillWidth = barWidth / healthPercentage;
            this.ctx.fillStyle = 'gray';
            this.ctx.fillRect(barX, barY, barWidth, barHeight);
            this.ctx.fillStyle = 'red';
            this.ctx.fillRect(barX, barY, barFillWidth, barHeight);
            this.ctx.strokeStyle = 'black';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(barX, barY, barWidth, barHeight);

            if (DEBUG) {
                Utils.drawDebugRect(this.ctx, this.x, this.y, this.w, this.h)
            }

            this.animation();
            this.flyAudio.play()
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
        this.isKilled = true;
    };
    
    animation() {
        this.animationTick++;
            
        if (this.animationTick > 2) {
          this.animationTick = 0;
          this.sprite.horizontalFrameIndex++;
    
          if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
            this.sprite.horizontalFrameIndex = 0;
          }
        }        
    }
}

