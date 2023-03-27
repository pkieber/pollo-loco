class CollectibleCoin extends MovableObject {
    IMAGES_COLLECTIBLE_COINS = [
        './img/8_coin/coin_1.png', 
        './img/8_coin/coin_2.png'
    ];


    height = 120;
    width = 120;


    constructor(x, y) {
        super();
        this.loadImage('./img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
    }
}