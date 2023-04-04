class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280; 
    height = 150;
    width = 100;


    /**
     * Loads an image from a path.
     * @param {*} path 
     */
    loadImage(path){
        this.img = new Image(); // this.img = document.getElementById('image') ... <img id="image" src>
        this.img.src = path;
    }


    /**
     * Draws the object on the canvas and catches errors.
     * The error is logged to the console if the image could not be loaded.
     * @param {*} ctx 
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (error) {
            console.warn('Error loading image', error);
            console.log('Could not load image', this.img.src);
        }
    }
    

    /**
     * Draws the frame of the object to help with collision detection.
     * Only if the object is an instance of Character, Chicken or Endboss, the frame is drawn.
     */
    /*
    drawFrame(ctx) {
        if(this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'rgba(0,128,0)';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
    */
    

    /**
     * Loads an array of images into the image cache.
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