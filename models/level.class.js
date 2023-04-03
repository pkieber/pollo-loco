class level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2250;
    collectibleBottles;
    collectibleCoins;


    constructor(enemies, clouds, backgroundObjects, collectibleBottles, collectibleCoins){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectibleBottles = collectibleBottles;
        this.collectibleCoins = collectibleCoins;
    }
}