class statusBarEndboss extends DrawableObject {
    
    IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png', // 0
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png', // 5
    ];

    percentage = 3;

    constructor(){
        super(); // Methoden von übergeordneten Objekt initialisieren. 
        this.loadImages(this.IMAGES); 
        this.x = 500;
        this.y = 0; // 50 ?
        this.width = 180; // 200
        this.height = 50; // 60
        this.setPercentage(3);                       
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 3) {
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