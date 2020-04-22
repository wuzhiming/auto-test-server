const WebSocket = require('ws');
const EventEmitter = require('events');
const Constant = require('./const');

/**
 * 主要用来跟appium的python交互的代码
 */
class Host extends EventEmitter {
    constructor() {
        super();
    }

    async init() {
        //手机的型号(id)
        this.phone = null;
        //测试的平台
        this.platform = null;

        //图片保存的路径
        this.targetPath = null;
        this.url = `ws://${Constant.HOST}:${Constant.HOST_PORT}`;

        const ws = new WebSocket(this.url);
        this.socket = ws;

        ws.on('open', () => {
            let loadedInfo = {state: Constant.HOST_ENUM.INIT};
            ws.send(JSON.stringify(loadedInfo));
        });

        ws.on('close', (e) => {
            this.emit('disconnect', e);
        });

        ws.on('error', (e) => {
            this.emit('error', e);
        });

        ws.on('message', (data) => {
            try {
                let ret = JSON.parse(data);
                switch (ret.state) {
                    case Constant.HOST_ENUM.INIT:
                        this.platform = ret.platform || '';
                        this.phone = ret.phone || '';
                        this.targetPath = ret.path;
                        this.emit(ret.state);
                        break;

                    case Constant.HOST_ENUM.END:
                        this.disconnect();
                        this.emit(ret.state);
                        break;
                }
            } catch (e) {
                this.emit('error', e);
            }
        });

        return new Promise((resolve, reject) => {
            this.once(Constant.HOST_ENUM.INIT, () => {
                resolve();
            });

            this.once('disconnect', (e) => {
                reject(e);
            });
            this.once('error', (e) => {
                reject(e);
            });
        });
    }

    sendMessage(msg){
        this.socket.send(JSON.stringify(msg));
    }

    disconnect() {
        this.socket.close();
    }

}

module.exports = Host;