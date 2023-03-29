class Endboss extends MovableObject {
    height = 400;
    width = 340;
    y = 50;
    isBossHit = false;
    intervalIds = [];


    IMAGES_ATTACKING = [
        './img/4_enemie_boss_chicken/2_alert/G5.png', 
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png',
        './img/4_enemie_boss_chicken/3_attack/G13.png', 
        './img/4_enemie_boss_chicken/3_attack/G14.png', 
        './img/4_enemie_boss_chicken/3_attack/G15.png', 
        './img/4_enemie_boss_chicken/3_attack/G16.png', 
        './img/4_enemie_boss_chicken/3_attack/G17.png', 
        './img/4_enemie_boss_chicken/3_attack/G18.png', 
        './img/4_enemie_boss_chicken/3_attack/G19.png', 
        './img/4_enemie_boss_chicken/3_attack/G20.png' 
    ];
    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png', 
        './img/4_enemie_boss_chicken/1_walk/G2.png', 
        './img/4_enemie_boss_chicken/1_walk/G3.png', 
        './img/4_enemie_boss_chicken/1_walk/G4.png', 
    ];
    IMAGES_DYING = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png', 
        './img/4_enemie_boss_chicken/4_hurt/G22.png', 
        './img/4_enemie_boss_chicken/4_hurt/G23.png',
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    walking_sound = new Audio('audio/pollo_loco.mp3');
    win_sound = new Audio('audio/win.mp3');
    hadFirstContact = false;
    

    constructor(){
        super().loadImage(this.IMAGES_ATTACKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_DYING); 
        this.x = 2600; 
        this.speed = 3 + Math.random() * 0.25;
        this.attackingSpeed = 30;
        this.animateEndboss();            
    }


    /**
     * This function animates the endboss.
     * It starts with the attacking animation and switches to the walking animation when the endboss is close to the character.
     */
    animateEndboss() {
        let i = 0;
        setInterval(() => {
            if (i < 30) {
                this.playAnimation(this.IMAGES_ATTACKING);
            } else {
                this.playEndbossAnimation();
            }
            i++;
            if ((world.character.x > world.level.endboss[0].x - 300) && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
                if (!world.character.mute) this.walking_sound.play();
                console.log("Endboss has first contact with character.", this.hadFirstContact);
            }
        }, 120);
    }


    /**
     * This function plays the animation.
     */
    playEndbossAnimation() {
        if (this.energy!==0 && !this.isHurt() && this.endbossShowdown()) {
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_ATTACKING);
            this.endbossAttacking();
        } else if (this.energy<=0) {
            this.endbossDying();
        }
    }


    /**
     * This function checks if the endboss is close to the character.
     * @returns {Boolean} true if the endboss is close to the character.
     */
    endbossShowdown() {
        return world.character.x > world.level.endboss[0].x - 800;
    }


    /**
     * This function increases the speed of the endboss when it attacks.
     * @returns {Number} the endboss' x position.
     */
    endbossAttacking() {
        let attackingSpeedIncrease = world.level.endboss[0].x -= this.attackingSpeed;
        return attackingSpeedIncrease;
    }

    
    /**
     * This function stops the game and shows the endscreen when the endboss is dead.
     */
    endbossDying () {
        this.playAnimation(this.IMAGES_DYING);
        stopGame();
        setTimeout(() => {
            closeFullscreen();
            showEndscreenWin();
            if (!world.character.mute) this.win_sound.play();
            soundOff();
        }, 1000);
    }
}