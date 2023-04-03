class SmallChicken extends MovableObject {
    height = 45;
    width = 45;
    y = 375;
    isHit = false;
    offset = {
        top: -10,
        bottom: 0,
        left: 20,
        right: 20 
    }


    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png', 
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];


    constructor(){
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING); 
        this.loadImages(this.IMAGES_DEAD);
        this.x = 500 + Math.random() * 1500;
        this.speed = 0.25 + Math.random() * 0.25; 
        this.animate();
    }


    /**
     * This function animates the small chickens.
     */
    animate(){
        setStoppableInterval(() => this.moveLeft(), 1000 / 60);
        setStoppableInterval(() => this.playSmallChickenAnimation(), 200);
    }


    /**
     * This function plays the small chicken animation depending on the state of the chicken.
     */
    playSmallChickenAnimation() {
        if (!this.isHit) this.playAnimation(this.IMAGES_WALKING);
            else {
                this.playAnimation(this.IMAGES_DEAD);
                this.speed = 0;
            }
    }        
}