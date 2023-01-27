class Character extends MovableObject{ // x- und y-Koordinate und zwei Funktionen: moveRight und jump

    height = 300;
    width = 120;
    y = 130;
    speed = 10;
    //
    mute = false;

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

    world; // Um auf Variablen (z.B. Keyboard) aus World zugreifen zu können. 

    walking_sound = new Audio('audio/running.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    pain_sound = new Audio('audio/pain.mp3');
    death_sound = new Audio('audio/character_death.mp3');
    background_sound = new Audio('audio/chicken.mp3');


    constructor(){
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');    // super muss nur einmal verwendet werden...
        this.loadImages(this.IMAGES_WALKING);                           // ... Hier werden Walking-Bilder geladen. 
        this.loadImages(this.IMAGES_JUMPING);                           // ... Hier werden Jumping-Bilder geladen. 
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }
    
    animate(){

        setInterval(() => {
            this.walking_sound.pause();
            // if (!this.mute) this.background_sound.play();  


            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){ // Grenze am rechten Ende.
                this.moveRight();
                this.otherDirection = false;
                if (!this.mute) this.walking_sound.play(); // ?
            }

            if(this.world.keyboard.LEFT && this.x > 0){ // Charakter kann links nicht aus dem Bild laufen. 
                this.moveLeft();
                this.otherDirection = true;
                if (!this.mute) this.walking_sound.play(); // ?
            }

            if(this.world.keyboard.SPACE && !this.isAboveGround()){ // Keyboard SPACE and NOT above ground...
                this.jump();
                if (!this.mute) this.jumping_sound.play(); // ? 
            }

            this.world.camera_x = -this.x + 100; // + 100 damit Charakter nicht am Rand klebt.
        }, 1000 / 60);

        setInterval(() => { // IF above ground, show Jumping-images, ELSE IF keyboard RIGHT OR LEFT, show Walking-Images
            if (this.isDead()){
                this.playAnimation(this.IMAGES_DEAD);
                if (!this.mute) this.death_sound.play(); // ?

            } else if (this.isHurt()){ 
                    this.playAnimation(this.IMAGES_HURT);
                    if (!this.mute) this.pain_sound.play(); // ?


            } else if (this.isAboveGround()){ 
                    this.playAnimation(this.IMAGES_JUMPING);

            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 100);
    }
}



