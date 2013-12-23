/**
 * Created with IntelliJ IDEA.
 * User: hujianmeng
 * Date: 13-12-23
 * Time: 下午12:40
 * To change this template use File | Settings | File Templates.
 */

var querystring = require('querystring');
var BufferHelper = require('bufferhelper');
var urlParse = require('url').parse;

exports.httpHandle = function (url, method, header, data, callback) {
    var contents = querystring.stringify(data);
    var urlObj = urlParse(url);
    header['Content-Length'] = contents.length;

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
        res.setEncoding('utf8');   //如果是媒体文件就不设置编码，直接用

        // 数据很多的情况下, 并非一次发送完毕. 因此需要记录下整个过程中发送的数据
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