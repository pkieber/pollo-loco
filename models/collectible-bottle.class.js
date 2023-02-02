class CollectibleBottle extends MovableObject {
    IMAGES_COLLECTIBLE_BOTTLE = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    height = 60;
    width = 50;
    
    constructor(x, y) {
        super();
        this.loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        //this.loadImages(this.IMAGES_COLLECTIBLE_BOTTLE);
        this.x = x;
        this.y = y;
    }
}