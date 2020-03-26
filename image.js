const jimp = require('jimp');
const ps = require('path');
const fs = require('fs-extra');

/**
 * 接收传过来的图片，旋转后保存
 * @param data
 * @param width
 * @param height
 * @param dest
 * @returns {Promise<unknown>}
 */
exports.saveImage = async function (data, width, height, dest) {
    return new Promise((resolve, reject) => {
        new jimp({width: width, height: height, data: data}, function (err, image) {
            if (err) {
                reject();
                return;
            }
            image.flip(false, true);
            image.write(dest);
            resolve();
        });
    });
};