class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280; 
    height = 150;
    width = 100;


    loadImage(path){
        this.img = new Image(); // this.img = document.getElementById('image') ... <img id="image" src>
        this.img.src = path;
    }

    
        /*
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    */

    
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (error) {
            console.warn('Error loading image', error);
            console.log('Could not load image', this.img.src);
        }
    }
    

    drawFrame(ctx) {
        // Canvas draw rectangle
        if(this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            // ctx.lineWidth = '5';
            // ctx.strokeStyle = 'rgba(0,0,0,0)'; // Hilfsrahmen
            ctx.rect(this.x, this.y, this.width, this.height);
            // ctx.stroke();
        }
    }
    

    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
        loadImages(arr){
            arr.forEach((path) => {
                let img = new Image();
                img.src = path;
                this.imageCache[path] = img;
            });
        }
}

