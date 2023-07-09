class Enemy {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = Math.random() > 0.5 ? 850 : -50
        this.y = Math.random() > 0.5 ? 650 : -50
        this.w = 50;
        this.h = 50;
        this.vx = 0; // Componente x de la velocidad actual
        this.vy = 0; // Componente y de la velocidad actual

        this.bullets = [];

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

            this.bullets.forEach(bullet => bullet.draw())
            this.flyAudio.play()
        }

    }

    move(isaac) {
        const dx = isaac.x - this.x; // Diferencia en la coordenada x
        const dy = isaac.y - this.y; // Diferencia en la coordenada y
    
        const angle = Math.atan2(dy, dx); // Ángulo hacia Isaac
    
        const targetSpeed = ENEMY_SPEED; // Velocidad objetivo
        const vx = Math.cos(angle) * targetSpeed; // Componente x de la velocidad
        const vy = Math.sin(angle) * targetSpeed; // Componente y de la velocidad
    
        const easing = 0.1; // Factor de interpolación (ajusta según sea necesario)
    
        // Interpolar la velocidad actual hacia la velocidad objetivo
        const interpolatedVx = this.vx + (vx - this.vx) * easing;
        const interpolatedVy = this.vy + (vy - this.vy) * easing;
    
        // Actualizar la posición usando la velocidad interpolada
        this.x += interpolatedVx;
        this.y += interpolatedVy;
    
        this.bullets.forEach(bullet => bullet.move());
    }

    shoot(isaac) {
        let vx = 0;
        let vy = 0;
        if (isaac.x > this.x + this.w) {
            vx = 1;
        } else if (isaac.x + isaac.w < this.x) {
            vx = -1;
        } 

        if (isaac.y > this.y + this.h) {
            vy = 1;
        } else if (isaac.y + isaac.h < this.y) {
            vy = -1;
        }
        const newEnemyBullet = new EnemyBullet(this.ctx, this.x, this.y+25, vx, vy);
        this.bullets.push(newEnemyBullet);  
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

