const Image = require('./image');

class ImageTask {
    static MAX_PROGRESS = 5;//同时进行多少的图片转换
    constructor() {
        this.currentTaskCount = 0;
        this.images = [];
    }

    push(image) {
        if (!image instanceof Image) {
            console.error(`only can push instance of image`);
            return;

        }
        this.images.push(image);
        this.run();
    }

    run() {
        if (this.currentTaskCount >= ImageTask.MAX_PROGRESS) return;
        let array = [];
        let delta = ImageTask.MAX_PROGRESS - this.currentTaskCount;
        delta = delta > this.images.length ? this.images.length : delta;
        for (let i = 0; i < delta; i++) {
            let image = this.images.shift();
            array.push(image.save());
            this.currentTaskCount++;
        }
        Promise.all(array).then(() => {
            this.currentTaskCount -= array.length;
            if (this.last) {
                this.run();
            }
        });
    }

    get last() {
        return this.images.length;
    }


}

module.exports = ImageTask;