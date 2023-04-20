class Endboss extends MovableObject {
    height = 400;
    width = 340;
    y = 50;
    offset = {
        top: 50,
        bottom: 10,
        left: 20,
        right: 20
    };


    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    walking_sound = new Audio('audio/pollo_loco.mp3');
    win_sound = new Audio('audio/win.mp3');    


    constructor(){
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD); 
        this.x = 2600; 
        this.speed = 25 + Math.random() * 0.5;
        this.animateEndboss();            
    }


    /**
     * Animates the endboss.
     */
    animateEndboss() {
        setStoppableInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                setStoppableInterval(() => this.y++, 20);
                setTimeout(() => {
                    this.playEndbossDeadAnimation();
                }, 2000);
            } else if (this.energy < 50) {
                this.playAnimation(this.IMAGES_ATTACK);
                this.moveLeft();
            } else if (this.energy == 100) {
                this.playAnimation(this.IMAGES_ALERT);
            } else if (this.energy < 100) {
                this.playAnimation(this.IMAGES_WALKING);
                this.moveLeft();
            } 
        }, 200);
    }
    

    /**
     * Stops the game and shows the endscreen when the endboss is dead.
     */
    playEndbossDeadAnimation(){
        stopGame();
        closeFullscreen();
        showEndscreenWin();
        if (!world.character.mute) this.win_sound.play();
        soundOff();
    }
}