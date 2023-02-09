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


    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld(){
        this.character.world = this;
    }


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


    // If bottles are thrown, push them into the array.
    checkThrownObjects() {
        if(this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            // this.statusBarBottles.setPercentage(this.character.energy); //? 
            this.throwableObjects.push(bottle);
        }
    }


    // Check if character and enemies are colliding (> hit enemies).
    checkCollisions() {
        this.level.enemies.forEach ((enemy) => {
            if(this.character.isColliding(enemy) && !this.character.isAboveGround()) { 
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                //console.log('Collision with Character, energy ', this.character.energy);
            }
        });
    }


    checkCollisionWithEndboss() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
        }
    }



    // Check if character and bottles are colliding (> collect bottles).
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


    // Check if character and coins are colliding (> collect coins).
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


    // Check if throwableObject and enboss are colliding. 
    checkIfEndbossHitByBottle () {
        this.throwableObjects.forEach ((throwableObject) => {
            if(this.endboss.isColliding(throwableObject)) {
            this.endboss.bottleHitEndboss();
            this.statusBarEndboss.setPercentage(this.endboss.bossEnergy); // ENERGIE WIRD KOMPLETT ABEZOGEN
            console.log('Collision with Endboss, bossEnergy ', this.endboss.bossEnergy);
            } 
        }); 
    } 


    // Check if character and chicken/small chicken are colliding from above (> jump on chicken).
    checkJumpOnEnemy() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            const enemy = this.level.enemies[i];
            if (
                this.character.isColliding(enemy) &&
                this.character.isAboveGround()
            ) {
            let crushedChicken = this.level.enemies.indexOf(enemy);
            //if (!this.level.enemies[hittedChicken].hitted && !this.character.mute)
            //this.level.enemies[hittedChicken].audio_hitted.play();
            this.level.enemies[crushedChicken].hitted = true;
            console.log("CHICKEN CRUSHED", crushedChicken);
            this.removeEnemy(enemy);
            }
        }
    }


    // Remove enemy from array after 3 seconds when character jumps on it.
    removeEnemy(enemy) {
        setTimeout(() => {
        this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
        }, 3000);
    }


    // draw() is used to draw the world and all objects in it like character, enemies, clouds, etc.
    // ctx.clear() is used to clear the canvas before drawing the next frame.
    // ctx.translate() is used to move the camera with the character on the x-axis.
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        // ------ Space for fixed objects --------
        this.addToMap(this.statusBar);   
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarEndboss);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.collectibleCoins); // ?
        this.addObjectsToMap(this.level.collectibleBottles);// ?
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0); //
        // Draw() is called again with requestAnimationFrame() to draw the next frame.
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    } 


    // Add objects to map.
    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    // Add movable objects to map and flip image if needed.
    addToMap(mo) { 
        if (mo.otherDirection){ 
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection){
            this.flipImageBack(mo);
        }
    }


    // Flip image horizontally (for left/right movement). 
    // ctx.save() and ctx.restore() are used to save and restore the context if image is flipped.
    // ctx.thanslate() is used to move the context and ctx.scale() is used to flip the context on the x-axis.
    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1,1);
        mo.x = mo.x *-1; 
    }


    flipImageBack(mo){
        mo.x = mo.x *-1;
        this.ctx.restore();
    }
}