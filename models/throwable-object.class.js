class ThrowableObject extends MovableObject {
    bottleCollision = false;


    IMAGES_BOTTLE_ROTATION = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]
    IMAGES_BOTTLE_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]


    throw_sound = new Audio('audio/bottle.mp3');
    

    constructor(x, y) {
        super().loadImage('./img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    
    /**
     * This function is called when an object is thrown.
     * The object will be thrown in the direction of the character and will be rotated.
     * After a certain time the object will splash.
     */
    throw() {
        this.speedY = 25;
        this.applyGravity();
        if (!world.character.mute) this.throw_sound.play();
        setStoppableInterval(() => {
            this.x += 20;
            this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
            setTimeout(() => {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            }, 900);
        }, 50);
    }
}