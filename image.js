const jimp = require('jimp');
const ps = require('path');
const fs = require('fs-extra');

class Image {
    constructor(width, height, data, dest, isPngData) {
        this.width = width;
        this.height = height;
        this.dest = dest;
        this.data = data;
        this.isPngData = isPngData || false;
    }

    save() {
        return new Promise(async (resolve, reject) => {
            console.log('saving image ==>', this.dest);
            if (this.isPngData) {
                try {
                    let image = await jimp.read(this.data);
                    image.flip(false, true);
                    image.write(this.dest);
                    resolve();
                } catch (e) {
                    reject(e);
                }
            } else {
                new jimp({width: this.width, height: this.height, data: this.data}, (err, image) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    image.flip(false, true);
                    image.write(this.dest);
                    resolve();
                });
            }
        });
    }
}

module.exports = Image;