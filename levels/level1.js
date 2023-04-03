let level1;

/**
 * This function initializes the level and sets the objects for the level.
 */
function initLevel() {
    level1 = new level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken()
        ],
        [
            new Cloud(),
            new Cloud(),     
            new Cloud(),     
        ],
        [ // (imagePath, x, (y))
            new BackgroundObject('img/5_background/layers/air.png', -719), 
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719), 
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png',719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719), 

            new BackgroundObject('img/5_background/layers/air.png', 719*2), 
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2), 
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),
            new BackgroundObject('img/5_background/layers/air.png',719*3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3),  
        ],
        [
            new CollectibleBottle(350, 360),
            new CollectibleBottle(500, 360), 
            new CollectibleBottle(700, 360), 
            new CollectibleBottle(800, 360), 
            new CollectibleBottle(1300, 360), 
            new CollectibleBottle(1400, 360), 
            new CollectibleBottle(1500, 360), 
            new CollectibleBottle(1650, 360), 
            new CollectibleBottle(1800, 360), 
            new CollectibleBottle(2000, 360) 
        ], 
        [
            new CollectibleCoin(650, 230),
            new CollectibleCoin(700, 180), 
            new CollectibleCoin(750, 120), 
            new CollectibleCoin(850, 120), 
            new CollectibleCoin(900, 180), 
            new CollectibleCoin(950, 230), 
            new CollectibleCoin(1200, 230), 
            new CollectibleCoin(1250, 180), 
            new CollectibleCoin(1300, 120), 
            new CollectibleCoin(1400, 120), 
            new CollectibleCoin(1450, 180), 
            new CollectibleCoin(1500, 230), 
            new CollectibleCoin(1800, 230), 
            new CollectibleCoin(1850, 180), 
            new CollectibleCoin(1900, 120), 
            new CollectibleCoin(2000, 120), 
            new CollectibleCoin(2050, 180), 
            new CollectibleCoin(2100, 230) 
        ]
    );
}