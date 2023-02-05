class World {
    character = new Character(); // let character
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0; // Camera startet bei 0 und läuft mit Character mit. 
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
            this.checkCollisionWithBottles();
            this.checkCollisionWithCoins(); 
            this.checkThrownObjects();
        }, 200);
    }

    checkThrownObjects() {
        if(this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            // this.statusBarBottles.setPercentage(this.character.energy); //? 
            this.throwableObjects.push(bottle);
        }
    }


    checkCollisions() {
        this.level.enemies.forEach ((enemy) => {
            if(this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                //console.log('Collision with Character, energy ', this.character.energy);
            }
        });
    }


    // Collecting bottles and coins
    checkCollisionWithBottles() {
        this.level.collectibleBottles.forEach((collectibleBottles) => {
            if (this.character.isColliding(collectibleBottles)) {
            // if (!this.character.mute) this.character.audio_collectBottle.play();
            this.character.collectibleBottles++;
            this.statusBarBottles.setPercentage(this.character.collectibleBottles);
            this.level.collectibleBottles.splice(this.level.collectibleBottles.indexOf(collectibleBottles), 1);
            }
        });
    }
    
    checkCollisionWithCoins() {
        this.level.collectibleCoins.forEach((collectibleCoins) => {
            if (this.character.isColliding(collectibleCoins)) {
            // if (!this.character.mute) this.character.audio_collectBottle.play();
            this.character.collectibleCoins++;
            this.statusBarCoins.setPercentage(this.character.collectibleCoins);
            this.level.collectibleCoins.splice(this.level.collectibleCoins.indexOf(collectibleCoins), 1);
            }
        });
    }


    // Welt gemalt und zuerst wieder gelöscht (clearRect) und Charakter, Ememies, Clouds, etc. werden wieder hinzugefügt. 
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        
        this.ctx.translate(-this.camera_x, 0);
        // ------ Space for fixed objects --------
        this.addToMap(this.statusBar);   
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarEndboss); // Only show when near endboss ?? 

        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.collectibleCoins); // ?
        this.addObjectsToMap(this.level.collectibleBottles);// ?
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0); //


        // Draw() wird immer wieder aufgerufen. 
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    } 

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) { // mo = movable Object
        if (mo.otherDirection){ 
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection){ // Falls Context oben verändert, dann restore.
            this.flipImageBack(mo);
        }
    }

    flipImage(mo){
        this.ctx.save(); // Falls andere Richtung, dann Context-Stand speichern
        this.ctx.translate(mo.width, 0); // .. verursacht das Verschieben.
        this.ctx.scale(-1,1); // .. verursacht das Spiegeln.
        mo.x = mo.x *-1; // .. x-Koordinate spiegeln. 
    }

    flipImageBack(mo){
        mo.x = mo.x *-1;
        this.ctx.restore();
    }
}