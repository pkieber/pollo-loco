class StatusBarCoins extends DrawableObject { 
    IMAGES = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png', // 0 = 0% coins
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png' // 5 = 100% coins
    ];


    percentage = 100;


    constructor(){
        super(); 
        this.loadImages(this.IMAGES); 
        this.x = 40;
        this.y = 50;
        this.width = 180;
        this.height = 50;
        this.setPercentage(0);                    
    }


    /**
     * Sets the percentage of the status bar for the coins.
     * @param {*} percentage 
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * Used to determine the correct image index.
     * @returns the index of the image that should be used.
     */
    resolveImageIndex() {
        if (this.percentage >= 5) {
            return 5;
        } else if (this.percentage == 4) {
            return 4; 
        } else if (this.percentage == 3) {
            return 3;
        } else if (this.percentage == 2) {
            return 2;
        } else if (this.percentage == 1) {
            return 1;
        } else {
            return 0;
        }
    }
}