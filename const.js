module.exports = {
    //保存的基础路径
    IMAGE_SAVE_PATH: '/Users/wzm/company/auto-test/',
    FRAME_RATE: 30,//客户端的帧率
    TOTAL_FRAME: 200,
    //接收消息列表
    RECEIVE_MESSAGE_ENUM: {
        LOADED: 'loaded',//程序加载完成，这时候会带参数信息过来
        CHANGE_SCENE: 'change-scene',//切换场景,这时候会带新场景的信息过来
        END: 'end',//测试结束
    },
    //发送消息列表
    SEND_MESSAGE_ENUM: {
        COMMON_STATUS: 'common-status',//常规消息
        IMAGE_SAVED: 'image-saved'
    },
    //成功失败状态码
    STATUS_CODE: {
        FAIL: 'fail',
        SUCCESS: 'success'
    }
};