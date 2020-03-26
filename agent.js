const Path = require('path');
const Fs = require('fs-extra');
const {saveImage} = require('./image');
const Constant = require('./const');

/**
 * ws实例，用来管理客户端行为
 */
class Agent {
    constructor(ws) {
        this.connection = ws;

        this.platform = null;
        this.width = null;
        this.height = null;
        this.dest = null;
        this.idx = 0;
        this.phone = '';//先不用，后续要加上去区分不同手机
        this.init();
    }

    /**
     * 是否进行初始化操作，传递各种数值过来
     * @returns {null}
     */
    get inited() {
        return this.platform && this.width && this.height && this.dest;
    }

    init() {
        this.connection.on('message', this.onMessage.bind(this));
        this.connection.on('error', this.onError.bind(this));
        this.connection.on('close', this.onClosed.bind(this));
    }

    async onMessage(message) {
        try {
            //如果是buffer数据，就是截图，这时候保存截图
            if (message.buffer) {
                this.saveImage(message);
            } else {
                await this.handleMessage(message);
            }
        } catch (e) {
            console.error(e);
            this.sendMessage({type: Constant.SEND_MESSAGE_ENUM.COMMON_STATUS, status: Constant.STATUS_CODE.FAIL})
        }
    }

    /**
     * 保存帧图
     * @param message
     * @returns {Promise<void>}
     */
    async saveImage(message) {
        await saveImage(message, this.width, this.height, Path.join(this.dest, `${++this.idx}.png`));
        this.sendMessage({
            type: Constant.SEND_MESSAGE_ENUM.IMAGE_SAVED,
            status: Constant.STATUS_CODE.SUCCESS
        });
    }

    async handleMessage(message) {
        let msg = JSON.parse(message);
        switch (msg.type) {
            //初始化
            case Constant.RECEIVE_MESSAGE_ENUM.LOADED:
                this.width = msg.width;
                this.height = msg.height;
                this.platform = msg.platform;
                this.sendMessage({
                    type: Constant.RECEIVE_MESSAGE_ENUM.LOADED,
                    status: Constant.STATUS_CODE.SUCCESS,
                    frameRate: Constant.FRAME_RATE,
                    total: Constant.FRAME_RATE,
                });
                break;
            //切换场景
            case Constant.RECEIVE_MESSAGE_ENUM.CHANGE_SCENE:
                this.dest = Path.join(Constant.IMAGE_SAVE_PATH, this.platform, this.phone, msg.scene);
                Fs.ensureDirSync(this.dest);
                this.idx = 0;
                this.sendMessage({
                    type: Constant.RECEIVE_MESSAGE_ENUM.CHANGE_SCENE,
                    status: Constant.STATUS_CODE.SUCCESS,
                    scene: msg.scene
                });
                break;
            default:
                console.log('未知的命令');
                break;
        }
    }

    sendMessage(msg) {
        this.connection.send(JSON.stringify(msg));
    }

    onError(event) {

    }

    onClosed(event) {

    }

    destroy() {

    }
}

module.exports = Agent;