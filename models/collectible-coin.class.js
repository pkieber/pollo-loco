class CollectibleCoin extends MovableObject {
    IMAGES_COLLECTIBLE_COINS = [
        './img/8_coin/coin_1.png', 
        './img/8_coin/coin_2.png'
    ];


    height = 120;
    width = 120;
    offset = {
        top: 70,
        left: 50,
        right: 50,
        bottom: 70
    };


    constructor(x, y) {
        super();
        this.loadImage('./img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
    }
}