class Endboss extends MovableObject {

    height = 400;
    width = 340;
    y = 50;
    isBossHit = false;
    bossEnergy = 100;
    bossEnergyLoss = 12.5;
    lastBossHit = 0;

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png', 
        './img/4_enemie_boss_chicken/1_walk/G2.png', 
        './img/4_enemie_boss_chicken/1_walk/G3.png', 
        './img/4_enemie_boss_chicken/1_walk/G4.png', 
    ];
    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png', 
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png', 
        './img/4_enemie_boss_chicken/3_attack/G14.png', 
        './img/4_enemie_boss_chicken/3_attack/G15.png', 
        './img/4_enemie_boss_chicken/3_attack/G16.png', 
        './img/4_enemie_boss_chicken/3_attack/G17.png', 
        './img/4_enemie_boss_chicken/3_attack/G18.png', 
        './img/4_enemie_boss_chicken/3_attack/G19.png', 
        './img/4_enemie_boss_chicken/3_attack/G20.png' 
    ];
    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png', 
        './img/4_enemie_boss_chicken/4_hurt/G22.png', 
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    walking_sound = new Audio('audio/pollo_loco.mp3');
    hadFirstContact = false; // Endboss has first contact with character.
    

    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]); // Preload first image. 
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);           
        this.loadImages(this.IMAGES_DEAD); 
        this.x = 2600; 
        this.bottleHitEndboss();
        this.isHurt();
        this.animate();            
    }

    
    // Endboss loses energy (hit by character's bottle).
    bottleHitEndboss() {
        this.bossEnergy -= this.bossEnergyLoss;
        if(this.bossEnergy <=  0) {
            this.bossEnergy = 0;
        } else {
            this.lastBossHit = new Date().getTime();
        }
    }


    isBossHurt() {
        let timepassed = new Date().getTime() - this.lastBossHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in seconds 
        return timepassed < 0.5;
    }


    animate(){
        setStoppableInterval(() => {
            this.moveLeft();
            //this.walking_sound.play();
        }, 1000 / 60);

        setStoppableInterval(() => {
            console.log('Boss is dead: ', this.bossEnergy == 0, 'Boss is hurt ', this.isBossHurt());
            if (this.bossEnergy == 0){
                this.playAnimation(this.IMAGES_DEAD);
                //this.death_sound.play();
                setTimeout(() => {
                    stopGame();
                }, 2000);
                // showEndscreen();
        
            } else if (this.isBossHurt()){ 
                this.playAnimation(this.IMAGES_HURT);
                // this.pain_sound.play();
        
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}



