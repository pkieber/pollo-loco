class World {
    character = new Character();
    endboss = new Endboss(); 
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBarCharacter();
    statusBarEndboss = new statusBarEndboss();
    statusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusBarBottles();
    throwableObjects = [];
    characterIsHurt = false;
    endbossIsHurt = false;


    smashchicken_sound = new Audio('audio/smash_chicken.mp3');
    smashendboss_sound = new Audio('audio/pollo_loco.mp3');
    bottlesplash_sound = new Audio('audio/bottle_splash.mp3');


    /**
     * <canvas> element is used to draw graphics and animations. 
     * @param {*} canvas 
     * @param {*} keyboard 
     */
    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * Sets the world for the character.
     */
    setWorld(){
        this.character.world = this;
    }


    /**
     * Checks whether objects are colliding with each other.
     * If objects are colliding, further actions can be performed.
     */
    run() {
        setInterval(() => {
            this.checkCollisionWithCoins();
            this.checkCollisionWithBottles();
            this.checkJumpOnEnemy();
        }, 50)
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionWithEndboss();
            this.checkThrownObjects();
            this.checkIfEndbossHitByBottle();
        }, 200)
    }


    /**
     * Checks if objects are thrown.
     * If bottles are thrown, they are pushed into the array.
     * Only one bottle will be thrown each time the "D" key is pressed.
     */    
    checkThrownObjects() {
        if (this.keyboard.D && this.character.bottle > 0 && !this.bottleThrown) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.bottleCount();
            this.bottleThrown = true;
        } else if (!this.keyboard.D) {
            this.bottleThrown = false;
        }
    }


    /**
     * Called when the character throws a bottle.
     * The bottle count is set to minus 1.
     */
    bottleCount() {
        this.character.bottle -= 1;
        //console.log('Collision with Character, bottles', this.character.bottle);
        this.statusBarBottles.setPercentage(this.character.bottle);
    }


    /**
     * Checks if character and enemies are colliding.
     * If so, the statusbar is updated.
     */
    checkCollisions() {
        this.level.enemies.forEach ((enemy) => {
            if(this.character.isColliding(enemy) && !this.character.isAboveGround() && !this.characterIsHurt && !enemy.isHit) { 
                this.character.hit();
                this.characterIsHurt = true;
                this.statusBar.setPercentage(this.character.energy);
                //console.log('Collision with Character, energy ', this.character.energy);
                setTimeout(() => {
                    this.characterIsHurt = false;
                }, 1000);
            }
        });
    }


    /**
     * Checks if character and endboss are colliding.
     * If so, the statusbar is updated.
     */
    checkCollisionWithEndboss() {
        if (this.character.isColliding(this.endboss) && !this.endboss.isDead()) {
            this.character.hit();
            this.characterIsHurt = true;
            this.statusBar.setPercentage(this.character.energy);
            setTimeout(() => {
                this.characterIsHurt = false;
            }, 1000);
        }
    }


    /**
     * Checks if character and bottles are colliding to collect them.
     * If so, the statusbar is updated.
     */
    checkCollisionWithBottles() {
        this.level.collectibleBottles.forEach ((bottle) => {
            if(this.character.isColliding(bottle)) {
                this.character.collectBottle();
                this.statusBarBottles.setPercentage(this.character.bottle);
                //console.log('Collected BOTTLES ', this.character.bottle);
                this.level.collectibleBottles.splice(this.level.collectibleBottles.indexOf(bottle), 1);
            }
        });
    }


    /**
     * Checks if character and coins are colliding to collect them.
     * If so, the statusbar is updated.
     */
    checkCollisionWithCoins() {
        this.level.collectibleCoins.forEach ((coin) => {
            if(this.character.isColliding(coin)) {
                this.character.collectCoin();
                this.statusBarCoins.setPercentage(this.character.coin);
                //console.log('Collected COINS ', this.character.coin);
                this.level.collectibleCoins.splice(this.level.collectibleCoins.indexOf(coin), 1);
            }
        });
    }


    /**
     * Checks if throwable objects (bottle) and endboss are colliding after bottle is thrown.
     * If so, the statusbar is updated.
     */
    checkIfEndbossHitByBottle() {
        this.throwableObjects.forEach((throwableObject) => {
            if (this.endboss.isColliding(throwableObject)) {
                this.endboss.hit(this.endboss.energy -= 5);
                this.endbossIsHurt = true;
                if (!world.character.mute) this.smashendboss_sound.play();
                this.statusBarEndboss.setPercentage(this.endboss.energy);
                //console.log('Collision with Endboss, Energy ', this.endboss.energy);
                this.throwableObjects.splice(this.throwableObjects, 1);
                setTimeout(() => {
                    this.endbossIsHurt = false;
                }, 1000);
            }
        })
    }


    /**
     * Checks if character and chicken/small chicken are colliding after character jumps on them.
     * Character can only kill chicken while falling down on it.
     * When enemy is dead, it cannot hurt character anymore.
     */
    checkJumpOnEnemy() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            const enemy = this.level.enemies[i];
            if (
                this.character.isColliding(enemy) && !this.character.isHurt() &&
                this.character.isAboveGround() && this.character.speedY < 0
            ) {
                enemy.isHit = true;
                if (!world.character.mute) this.smashchicken_sound.play();
                this.removeEnemy(enemy);
                //console.log("CHICKEN CRUSHED", crushedChicken);
            }
        }
    }


    /**
     * Removes the enemy from the array after being killed.
     * @param {*} enemy 
     */
    removeEnemy(enemy) {
        setTimeout(() => {
            const index = this.level.enemies.indexOf(enemy);
            if (index > -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 1500);
    }


    /**
     * Draws the world and all objects in it like character, enemies, clouds, etc.
     * ctx.clear() is used to clear the canvas before drawing the next frame.
     * ctx.translate() is used to move the camera with the character on the x-axis.
     * Draw() is called again with requestAnimationFrame() to draw the next frame.
     */
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addStatusBars();
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addToMap(this.endboss);
        this.addObjects();
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    } 


    /**
     * Draws status bars on the map. 
     */
    addStatusBars(){
        this.addToMap(this.statusBar);   
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarEndboss);
    }


    /**
     * Draws objects on the map. 
     */
    addObjects(){
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.collectibleCoins);
        this.addObjectsToMap(this.level.collectibleBottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
    }


    /**
     * Adds objects to the map.
     * @param {*} objects 
     */
    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * Adds movable objects to the map.
     * @param {*} mo 
     */
    addToMap(mo) { 
        if (mo.otherDirection){ 
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        //mo.drawFrame(this.ctx);
        if (mo.otherDirection){
            this.flipImageBack(mo);
        }
    }


    /**
     * Flips the image horizontally.
     * ctx.save() and ctx.restore() are used to save and restore the context if image is flipped.
     * ctx.thanslate() is used to move the context and ctx.scale() is used to flip the context on the x-axis.
     * @param {*} mo 
     */
    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1,1);
        mo.x = mo.x *-1; 
    }


    /**
     * Flips the image back to normal.
     * @param {*} mo 
     */
    flipImageBack(mo){
        mo.x = mo.x *-1;
        this.ctx.restore();
    }
}