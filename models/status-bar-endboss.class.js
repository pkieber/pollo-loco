class statusBarEndboss extends DrawableObject {
    IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png', // 0 = Zero Energy
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png', // 4 = Full Energy
    ];


    percentage = 100;


    constructor(){
        super(); // Methoden von übergeordneten Objekt initialisieren. 
        this.loadImages(this.IMAGES); 
        this.x = 500;
        this.y = 0; // 50 ?
        this.width = 180; // 200
        this.height = 50; // 60
        this.setPercentage(100);                       
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    
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