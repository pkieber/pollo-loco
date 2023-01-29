class Cloud extends MovableObject{
    y = 20;         // vertikal
    width = 500;    // Diese Werte bleiben konstant, deshalb nicht in constructor() als dynamisch definieren
    height = 250;   // Diese Werte bleiben konstant, deshalb nicht in constructor() als dynamisch definieren
    
    constructor(){
        super().loadImage('./img/5_background/layers/4_clouds/1.png');
    
        this.x = Math.random() * 500; // Zufälliges Platzieren auf der x-Achse (horizontal)
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.moveLeft();
            // this.background_sound.play(); 
        }, 1000 / 60);
    }
}