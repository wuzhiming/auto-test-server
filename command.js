let {spawn, exec} = require('child_process');
const http = require('http');
var url = require("url");
var querystring = require("querystring");
const PORT = 6788;
const requestListener = async function (req, res) {
    try {
        res.writeHead(200);
        //获取返回的url对象的query属性值
        var arg = url.parse(req.url).query;

        //将arg参数字符串反序列化为一个对象
        var params = querystring.parse(arg);
        if (!params.command) {
            res.end('command not found');
            return;
        }
        await execCommand(params.command);
        res.end('success');
    } catch (e) {
        res.end('fail', e);
    }
};

/**
 * 好吧，我承认这个方法很危险，可以执行任何命令，不过内部在用的就先随意了
 * @param command
 * @returns {Promise<unknown>}
 */
async function execCommand(command) {
    if (!command) return Promise.reject();

    console.log('exec command ', command);
    return new Promise((resovle, reject) => {
        let result = exec(command,
            (err, stdout, stderr) => {
                if (err) {
                    console.error('exec err');
                    reject();
                }
                stdout && console.log('stdout output--->', stdout.toString());
                stderr && console.log('stderr output--->', stderr.toString());
                resovle(stdout.toString());
            });
    })
}

const server = http.createServer(requestListener);
server.listen(PORT);
console.log('server start on port', PORT);
