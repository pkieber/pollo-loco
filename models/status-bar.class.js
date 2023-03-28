class StatusBarCharacter  extends DrawableObject { // see World.class.js !!
    IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png', // 0
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png' // 5
    ];


    percentage = 100;


    constructor(){
        super(); // Methoden von übergeordneten Objekt initialisieren. 
        this.loadImages(this.IMAGES); 
        this.x = 40;
        this.y = 0;
        this.width = 180; // 200
        this.height = 50; // 60
        this.setPercentage(100);                       
    }


    /**
     * This method sets the percentage of the health bar for the character.
     * @param {*} percentage 
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    
    /**
     * This method is used to determine the correct image index.
     * @returns the index of the image that should be used.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4; 
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}