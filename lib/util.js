/**
 * Created with IntelliJ IDEA.
 * User: hujianmeng
 * Date: 13-12-23
 * Time: 下午12:40
 * To change this template use File | Settings | File Templates.
 */
var BufferHelper = require('bufferhelper');
var urlParse = require('url').parse;

exports.httpHandle = function (url, method, header, postData, callback) {
    var contents = JSON.stringify(postData);
    var urlObj = urlParse(url);
    header['Content-Length'] = Buffer.isBuffer(contents) ? contents.length : Buffer.byteLength(contents);

    var options = {
        type: urlObj.protocol.replace(':', ''),
        host: urlObj.hostname,
        port: this.type == 'http' ? 80 : 443,
        path: urlObj.path, // 具体路径, 必须以'/'开头, 是相对于host而言的
        method: method,
        headers: header
    };

    var req = require(options.type == 'http' ? 'http' : 'https').request(options, function (res) {
        var bufferHelper = new BufferHelper();
        res.setEncoding('utf8');

        res.on('data', function (data) {
            bufferHelper.concat(data);
        });

        // 在数据发送完毕后触发
        res.on('end', function () {
            callback(bufferHelper.toBuffer().toString());
        });
    });

    req.write(contents);
    req.end();
};