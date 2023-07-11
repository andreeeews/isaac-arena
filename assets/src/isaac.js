class Isaac {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = 40;
    this.h = 34;

    this.animationTick = 0;
    this.animationDirection = 0;
    this.isWalking = false;

    this.vx = 0;
    this.vy = 0;

    this.weapon = new Weapon(this.ctx, this.x + this.w, this.y + this.h / 2);

    this.shooting = null;

    this.sprite = new Image();
    this.sprite.src = "/assets/img/newisaac_sprite.png";
    this.sprite.horizontalFrames = 3;
    this.sprite.horizontalFrameIndex = 0
    this.sprite.verticalFrames = 4;
    this.sprite.verticalFrameIndex = 0


    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.floor(
        this.sprite.width / this.sprite.horizontalFrames
      );
      this.sprite.frameHeight = Math.floor(
        this.sprite.height / this.sprite.verticalFrames
      );
    };
  }

  draw() {
    if (this.sprite.isReady) {
        const spriteOffsetY = this.sprite.frameHeight - this.h;
        this.ctx.drawImage(
            this.sprite,
            this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
            this.sprite.verticalFrameIndex * this.sprite.frameHeight + spriteOffsetY,
            this.sprite.frameWidth,
            this.sprite.frameHeight - spriteOffsetY,
            this.x,
            this.y + spriteOffsetY,
            this.w,
            this.h - spriteOffsetY
      );
      if (DEBUG) {
        Utils.drawDebugRect(this.ctx, this.x, this.y, this.w, this.h);
      }
    }

    this.weapon.draw();

        this.animationWalk();


    
  }

  onKeyDown(keyCode) {
    switch (keyCode) {
      case KEY_UP:
        this.vy = -PLAYER_SPEED;
        this.animationDirection = 2;
        this.isWalking = true;
        break;
      case KEY_DOWN:
        this.vy = PLAYER_SPEED;
        this.animationDirection = 1;
        this.isWalking = true;
        break;
      case KEY_RIGHT:
        this.vx = PLAYER_SPEED;
        this.animationDirection = 3;
        this.isWalking = true;
        break;
      case KEY_LEFT:
        this.vx = -PLAYER_SPEED;
        this.animationDirection = 4;
        this.isWalking = true;
        break;
      case FIRE_RIGHT:
        this.shooting = "right";
        break;
      case FIRE_LEFT:
        this.shooting = "left";
        break;
      case FIRE_UP:
        this.shooting = "up";
        break;
      case FIRE_DOWN:
        this.shooting = "down";
        break;
    }
  }

  onKeyUp(keyCode) {
    switch (keyCode) {
      case FIRE_RIGHT:
      case FIRE_LEFT:
      case FIRE_UP:
      case FIRE_DOWN:
        this.shooting = null;
        break;
      case KEY_UP:
        this.vy = 0;
        this.animationDirection = 0;
        this.isWalking = false;
        break;
      case KEY_DOWN:
        this.vy = 0;
        this.animationDirection = 0;
        this.isWalking = false;
        break;
      case KEY_LEFT:
      case KEY_RIGHT:
        this.vx = 0;
        this.animationDirection = 0;
        this.isWalking = false;
        break;
    }
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.w > this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - this.w;
    }

    if (this.y < 0) {
      this.y = 0;
    } else if (this.y + this.h > this.ctx.canvas.height) {
      this.y = this.ctx.canvas.height - this.h;
    }

    if (this.shooting) {
      this.weapon.shoot(this.shooting);
    }

    this.weapon.x = this.x + this.w / 2;
    this.weapon.y = this.y + this.h / 2;

    this.weapon.move();
  }

  animationWalk() {
    this.animationTick++;
  
    if (this.isWalking) {
      switch (this.animationDirection) {
        case 1: // Movimiento hacia abajo
          this.sprite.horizontalFrameIndex = 0;
          this.sprite.verticalFrameIndex = 0;
          break;
        case 2: // Movimiento hacia arriba
          this.sprite.horizontalFrameIndex = 0;
          this.sprite.verticalFrameIndex = 3;
          break;
        case 3: // Movimiento hacia la derecha
          this.sprite.horizontalFrameIndex = 0;
          this.sprite.verticalFrameIndex = 2;
          break;
        case 4: // Movimiento hacia la izquierda
          this.sprite.horizontalFrameIndex = 0;
          this.sprite.verticalFrameIndex = 1;
          break;
      }
  
      if (this.animationTick > 3) {
        this.animationTick = 0;
        this.sprite.horizontalFrameIndex++;
  
        if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
          this.sprite.horizontalFrameIndex = 0;
        }
      }
    }
  }
}
