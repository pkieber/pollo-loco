class Cloud extends MovableObject{
    y = 20;     
    width = 500; 
    height = 250;
    
    
    constructor(){
        super().loadImage('./img/5_background/layers/4_clouds/1.png');
        this.x = 400 + Math.random() * 2500; 
        this.animate();
    }


    /**
     * This function animates the clouds.
     */
    animate(){
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}