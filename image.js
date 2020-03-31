const jimp = require('jimp');
const ps = require('path');
const fs = require('fs-extra');

class Image {
    constructor(width, height, data, dest) {
        this.width = width;
        this.height = height;
        this.dest = dest;
        this.data = data;
    }

    save() {
        return new Promise((resolve, reject) => {
            console.log('saving image ==>', this.dest);
            new jimp({width: this.width, height: this.height, data: this.data}, (err, image) => {
                if (err) {
                    reject();
                    return;
                }
                image.flip(false, true);
                image.write(this.dest);
                resolve();
            });
        });
    }
}

module.exports = Image;