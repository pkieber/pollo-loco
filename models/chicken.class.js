class Chicken extends MovableObject {
    height = 75;
    width = 65;
    y =345;
    isHit = false;


    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    constructor(){
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING); 
        this.loadImages(this.IMAGES_DEAD);
        this.x = 400 + Math.random() * 1500; 
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }


    /**
     * This function animates the chicken.
     */
    animate(){
        setStoppableInterval(() => this.moveLeft(), 1000 / 60);
        setStoppableInterval(() => this.playChickenAnimation(), 200);    
    }


    /**
     * This function plays the chicken animation depending on the state of the chicken.
     */
    playChickenAnimation() {
        if (!this.isHit) this.playAnimation(this.IMAGES_WALKING);
            else {
                this.playAnimation(this.IMAGES_DEAD);
                this.speed = 0;
            }       
        }
}