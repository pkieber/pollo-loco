let level1;
function initLevel() {

    level1 = new level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new Endboss(),
        ],
        [
            new Endboss()
        ],
        [
            new Cloud(),
            new Cloud(),     
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719), 
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719), 
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0), // (imagePath, x) // y wird berechnet
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0), // (imagePath, x) // y wird berechnet
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0), // (imagePath, x) // y wird berechnet
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0), // (imagePath, x) // y wird berechnet
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
            new CollectibleBottle(1500, 360) 
        ], 
        [
            new CollectibleCoin(650, 300),
            new CollectibleCoin(700, 250), 
            new CollectibleCoin(750, 200), 
            new CollectibleCoin(850, 200), 
            new CollectibleCoin(900, 250), 
            new CollectibleCoin(950, 300), 
            new CollectibleCoin(1200, 300), 
            new CollectibleCoin(1250, 250), 
            new CollectibleCoin(1300, 200), 
            new CollectibleCoin(1400, 200), 
            new CollectibleCoin(1450, 250), 
            new CollectibleCoin(1500, 300) 
        ]
    );
}