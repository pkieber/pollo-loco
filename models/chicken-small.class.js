class SmallChicken extends MovableObject { // mit extends werden Eigenschaften einer weiteren Klasse eingefügt
    
    height = 45;
    width = 45;
    y = 375;
    //energy = 100;
    //energyLoss = 100; 

    mute = false;

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png', 
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    // background_sound = new Audio('audio/chicken.mp3');

    
    constructor(){
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING); 
        this.loadImages(this.IMAGES_DEAD);
        this.x = 500 + Math.random() * 500; // Zufälliges Platzieren auf der x-Achse. Zahl zwischen 200 und 700
        this.speed = 0.25 + Math.random() * 0.25; // Min. Speed = 0.15 + random speed zwischen 0 + 0.25

        this.animate();
    }

    animate(){
        setInterval(() => {
            this.moveLeft();
            // this.background_sound.play(); 
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}