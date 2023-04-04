class Character extends MovableObject{
    height = 300;
    width = 120;
    y = 130;
    speed = 10;
    mute = false;
    offset = {
        top: 120,
        bottom: 30,
        left: 20,
        right: 20,
    };


    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'        
    ];
    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png',
    ]
    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png', 
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ]


    world;
    walking_sound = new Audio('audio/running.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    pain_sound = new Audio('audio/pain.mp3');
    death_sound = new Audio('audio/character_death.mp3');
    background_sound = new Audio('audio/background.mp3');


    constructor(){
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');    
        this.loadImages(this.IMAGES_WALKING);                           
        this.loadImages(this.IMAGES_JUMPING);                           
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.applyGravity();
        this.animate();
    }


    /**
     * Animates the character.
     */
    animate(){
        setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
        setStoppableInterval(() => this.playCharacterAnimation(), 100);
    }


    /**
     * Moves the character in the game based on the key pressed.
     */
    moveCharacter(){
        this.walking_sound.pause();
        if (!this.mute) {
            this.background_sound.play();  
        } else {
            this.background_sound.pause();
        } 
        if(this.canMoveRight()){ 
            this.moveRight();
            this.otherDirection = false;
            if (!this.mute) this.walking_sound.play(); 
        }
        if(this.canMoveLeft()){ 
            this.moveLeft();
            this.otherDirection = true;
            if (!this.mute) this.walking_sound.play();
        }
        if(this.canJump()){
            this.jump();
            if (!this.mute) this.jumping_sound.play();
        }
        this.world.camera_x = -this.x + 100;
    }


    /**
     * Plays the correct animation of the character based on the condition.
     */
    playCharacterAnimation(){
        if (this.isDead()){
            this.playCharacterDeadAnimation();
        } else if (this.isHurt()){ 
                this.playAnimation(this.IMAGES_HURT);
                if (!this.mute) this.pain_sound.play();
        } else if (this.isAboveGround()){ 
                this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
                this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }


    /**
     * Called when character is dead.
     */
    playCharacterDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
            if (!this.mute) this.death_sound.play();
            setTimeout(() => {
                stopGame();
                closeFullscreen();
                showEndscreenLost();
            }, 2000);
    }


    /**
     * Checks if the character can move right.
     * @returns
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }


    /**
     * Checks if the character can move left. 
     * @returns 
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }


    /**
     * Checks if the character can jump.
     * @returns
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }
}