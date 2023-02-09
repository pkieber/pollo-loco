class level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    level_end_x = 2250;
    collectibleBottles;
    collectibleCoins;

    constructor(enemies, endboss, clouds, backgroundObjects, collectibleBottles, collectibleCoins){
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectibleBottles = collectibleBottles;
        this.collectibleCoins = collectibleCoins;
    }
}