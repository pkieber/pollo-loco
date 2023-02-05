class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    coin = 0; // coin counter
    bottle = 0; // bottle counter
    energy = 100;
    energyLoss = 2; 
    lastHit = 0;
    offsetY = 100;
    offsetX = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true; 
        } else {
            return this.y < 120;
        }
    }

    // Bessere Formel zur Kollisionsberechnung (Genauer)
    isColliding(mo) {
        return  (this.x + this.width + this.offsetX) >= mo.x && this.x <= (mo.x + mo.width) && 
                (this.y + this.offsetY + this.height) >= mo.y &&
                (this.y + this.offsetY) <= (mo.y + mo.height); 
                //mo.onCollisionCourse;
    }

    hit() {
        this.energy -=this.energyLoss;
        if(this.energy <=  0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    collectCoin() {
        this.coin += 1;
        if (this.coin <= 0) {
            this.coin = 0;
        } else {
            this.lastCoinHit = new Date().getTime();
        }
    }


    collectBottle() {
        this.bottle += 1;
        if (this.bottle <= 0) {
            this.bottle = 0;
        } else {
            this.lastBottleHit = new Date().getTime();
        }
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in seconds 
        return timepassed < 0.5;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6; // see remainder operator // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0 ...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight(){
        this.x += this.speed;
    }

    moveLeft(){ // x-Koordinate verändern, um zu animieren
        this.x -= this.speed;
    }

    jump(){
        this.speedY = 30; // Jumping height
    }
}
