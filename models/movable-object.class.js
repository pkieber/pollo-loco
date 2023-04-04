class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    coin = 0; // coin counter
    bottle = 0; // bottle counter
    energy = 100;
    lastHit = 0;
    /**
     * Used to adjust the collision detection variables.
     */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }


    collectcoin_sound = new Audio('audio/collectbottle.mp3');
    collectbottle_sound = new Audio('audio/collectcoin.mp3');
    

    /**
     * Applies gravity to the character.
     * SpeedY variable is used to calculate the character's vertical position.
     * Acceleration variable is used to calculate the character's vertical speed.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
     * Checks if the character is jumping or falling.
     * This.y < 120 is used to check if the character is on the ground.
     * @returns 
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true; 
        } else {
            return this.y < 120;
        }
    }
    

    /**
     * Checks if a collision is happening on top, bottom, left or right of a movable object.
     * Offset is used to adjust the collision detection variables.
     * @param {*} mo 
     * @returns 
     */  
    isColliding(mo) {
        return (this.x + this.width - this.offset.right > mo.x + mo.offset.left) && // right to left collision
        (this.y + this.height - this.offset.bottom > mo.y + mo.offset.top) && // top to bottom collision
        (this.x + this.offset.left < mo.x + mo.width - mo.offset.right) && // left to right collision
        (this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom); // bottom to top collision
    }  

    
    /**
     * Called when the character is hit by an enemy.
     * Reduces the character's energy when it is hit by an enemy.
     */
    hit() {
        this.energy -= 5;
        if(this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Called when the character is collecting coins.
     * Adds to the coin counter if the character is collecting coins.
     */
    collectCoin() {
        this.coin += 1;
        if (!world.character.mute) this.collectcoin_sound.play();
        if (this.coin <= 0) {
            this.coin = 0;
        } else {
            this.lastCoinHit = new Date().getTime();
        }
    }


    /**
     * Called when the character is collecting bottles.
     * Adds to the bottle counter if the character is collecting bottles.
     */
    collectBottle() {
        this.bottle += 1;
        if (!world.character.mute) this.collectbottle_sound.play();
        if (this.bottle <= 0) {
            this.bottle = 0;
        } else {
            this.lastBottleHit = new Date().getTime();
        }
    }


    /**
     * Called when the character is hurt.
     * Timepassed variable is used to adjust the time the character is hurt.
     * @returns 
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    
    /**
     * Called when the character is dead.
     * @returns 
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * Called when images are used to animate the character.
     * Cache is used to prevent the images from being loaded multiple times.
     * @param {*} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Called when the character is moving right.
     */
    moveRight(){
        this.x += this.speed;
    }


    /**
     * Called when the character is moving left.
     */
    moveLeft(){
        this.x -= this.speed;
    }

    
    /**
     * Called when the character is jumping.
     */
    jump(){
        this.speedY = 30;
    }
}