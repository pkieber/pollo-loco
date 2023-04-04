class statusBarEndboss extends DrawableObject {
    IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png', // 0 = 0% energy
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png', // 4 = 100% energy
    ];


    percentage = 100;


    constructor(){
        super();
        this.loadImages(this.IMAGES); 
        this.x = 500;
        this.y = 0;
        this.width = 180;
        this.height = 50;
        this.setPercentage(100);                       
    }


    /**
     * Sets the percentage of the health bar for the endboss.
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
        if (this.percentage == 100) {
            return 4;
        } else if (this.percentage >= 75) {
            return 3; 
        } else if (this.percentage >= 50) {
            return 2;
        } else if (this.percentage >= 25) {
            return 1;
        } else {
            return 0;
        }
    }
}