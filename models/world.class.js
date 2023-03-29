class World {
    character = new Character();
    endboss = new Endboss(); 
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0; // Camera starts at position 0 on the x-axis (and moves with the character).
    statusBar = new StatusBarCharacter();
    statusBarEndboss = new statusBarEndboss();
    statusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusBarBottles();
    throwableObjects = [];
    characterIsHurt = false;
    endbossIsHurt = false;


    smashchicken_sound = new Audio('audio/smashchicken.mp3');
    bottlesplash_sound = new Audio('audio/bottlesplash.mp3');


    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * This function sets the world for the character.
     */
    setWorld(){
        this.character.world = this;
    }


    /**
     * This function checks whether objects are colliding with each other.
     * If objects are colliding, further actions can be performed.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionWithEndboss()
            this.checkCollisionWithBottles();
            this.checkCollisionWithCoins(); 
            this.checkThrownObjects();
            this.checkIfEndbossHitByBottle();
            this.checkJumpOnEnemy();
        }, 200);
    }


    /**
     * This function checks if objects are thrown.
     * If bottles are thrown, they are pushed into the array.
     */    
    checkThrownObjects() {
        if(this.keyboard.D && this.character.bottle > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.bottleCount();
        }
    }


    /**
     * This function is called when the character throws a bottle.
     * The bottle count is set to minus 1.
     */
    bottleCount() {
        this.character.bottle -= 1;
        console.log('Collision with Character, bottles', this.character.bottle);
        this.statusBarBottles.setPercentage(this.character.bottle);
    }


    /**
     * This function checks if character and enemies are colliding.
     * If so, the statusbar is updated.
     */
    checkCollisions() {
        this.level.enemies.forEach ((enemy) => {
            if(this.character.isColliding(enemy) && !this.character.isAboveGround() && !this.characterIsHurt) { 
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
     * This function checks if character and endboss are colliding.
     * If so, the statusbar is updated.
     */
    checkCollisionWithEndboss() {
        if (this.character.isColliding(this.endboss) && !this.characterIsHurt) {
            this.character.hit();
            this.characterIsHurt = true;
            this.statusBar.setPercentage(this.character.energy);
            setTimeout(() => {
                this.characterIsHurt = false;
            }, 1000);
        }
    }


    /**
     * This function checks if character and bottles are colliding to collect them.
     * If so, the statusbar is updated.
     */
    checkCollisionWithBottles() {
        this.level.collectibleBottles.forEach ((collectibleBottles) => {
            if(this.character.isColliding(collectibleBottles)) {
                this.character.collectBottle();
                this.statusBarBottles.setPercentage(this.character.bottle);
                //console.log('Collected BOTTLES ', this.character.bottle);
                this.level.collectibleBottles.splice(this.level.collectibleBottles.indexOf(collectibleBottles), 1);
            }
        });
    }


    /**
     * This function checks if character and coins are colliding to collect them.
     * If so, the statusbar is updated.
     */
    checkCollisionWithCoins() {
        this.level.collectibleCoins.forEach ((collectibleCoins) => {
            if(this.character.isColliding(collectibleCoins)) {
                this.character.collectCoin();
                this.statusBarCoins.setPercentage(this.character.coin);
                //console.log('Collected COINS ', this.character.coin);
                this.level.collectibleCoins.splice(this.level.collectibleCoins.indexOf(collectibleCoins), 1);
            }
        });
    }


    /**
     * This function checks if throwable objects (bottle) and endboss are colliding after bottle is thrown.
     * If so, the statusbar is updated.
     */
    checkIfEndbossHitByBottle () {
        this.throwableObjects.forEach ((throwableObject) => {
            if(this.endboss.isColliding(throwableObject) && !this.endbossIsHurt) {
                this.endboss.hit();
                this.endbossIsHurt = true;
                if (!world.character.mute) this.smashchicken_sound.play();
                this.statusBarEndboss.setPercentage(this.endboss.energy -=20);
                console.log('Collision with Endboss, Energy ', this.endboss.energy);
                setTimeout(() => {
                    this.endbossIsHurt = false;
                }, 1000);
            } 
        }); 
    } 


    /**
     * This function checks if character and chicken/small chicken are colliding after character jumps on them.
     */
    checkJumpOnEnemy() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            const enemy = this.level.enemies[i];
            if (
                this.character.isColliding(enemy) &&
                this.character.isAboveGround() &&
                !this.character.isHurt()
            ) {
            let crushedChicken = this.level.enemies.indexOf(enemy);
            this.level.enemies[crushedChicken].isHit = true;
            console.log("CHICKEN CRUSHED", crushedChicken);
            this.removeEnemy(enemy);
            }
        }
    }


    /**
     * This function removes the enemy from the array.
     * @param {*} enemy 
     */
    removeEnemy(enemy) {
        setTimeout(() => {
        this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
        }, 500);
    }
    /*
    removeEnemy(enemy) {
        setTimeout(() => {
            let i = this.level.enemies.indexOf(enemy);      
            this.level.enemies.splice(i, 1);
        }, 1500);
    }
    */


    /**
     * This function draws the world and all objects in it like character, enemies, clouds, etc.
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
        this.addObjects();
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    } 


    /**
     * This function draws status bars on the map. 
     */
    addStatusBars(){
        this.addToMap(this.statusBar);   
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarEndboss);
    }


    /**
     * This function draws objects on the map. 
     */
    addObjects(){
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.collectibleCoins); // ?
        this.addObjectsToMap(this.level.collectibleBottles);// ?
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObjects);
    }


    /**
     * This function adds objects to the map.
     * @param {*} objects 
     */
    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * This function adds movable objects to the map.
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
     * This function flips the image horizontally.
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
     * This function flips the image back to normal.
     * @param {*} mo 
     */
    flipImageBack(mo){
        mo.x = mo.x *-1;
        this.ctx.restore();
    }
}