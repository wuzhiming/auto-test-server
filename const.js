module.exports = {
    //保存的基础路径
    PORT: 9999,//本服务器的监听端口
    HOST: '127.0.0.1',//appium 的服务器的ip
    HOST_PORT: 8000,//appium 的服务器端口
    FRAME_RATE: 15,//客户端的帧率
    TOTAL_FRAME: 150,//截帧的数量

    //给appium发消息的消息列表
    HOST_ENUM: {
        INIT: 'Init',
    },

    //接收消息列表
    RECEIVE_MESSAGE_ENUM: {
        LOADED: 'loaded',//程序加载完成，这时候会带参数信息过来
        CHANGE_SCENE: 'change-scene',//切换场景,这时候会带新场景的信息过来
        END: 'end',//测试结束
        SCENE_CHANGED: 'SceneChanged',//兼容王浩之前python服务器的代码
        HOST_END:'End',//python服务器兼容end的代码
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