class CollectibleBottle extends MovableObject {
    IMAGES_COLLECTIBLE_BOTTLE = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];


    height = 60;
    width = 50;
    offset = {
        top: 0,
        left: 20,
        right: 20,
        bottom: 0
    };
    
    
    constructor(x, y) {
        super();
        this.loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = x;
        this.y = y;
    }
}