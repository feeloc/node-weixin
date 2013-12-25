/**
 * Created with IntelliJ IDEA.
 * User: hujianmeng
 * Date: 13-12-23
 * Time: 下午12:40
 * To change this template use File | Settings | File Templates.
 */

var fs = require('fs');
var sha1 = require('sha1');
var BufferHelper = require('bufferhelper');
var xml2js = require('xml2js');
var events = require('events');
var emitter = new events.EventEmitter();
var httpHandle = require('./lib/util').httpHandle;
var weixinMsgXml = require('./lib/weixinMsgXml').weixinMsgXml;

/**
 * 微信类，实现微信的所有接口
 * @param options
 * @constructor
 */
var Weixin = function (options) {
    this.accessTokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={APPID}&secret={APPSECRET}';
    this.postKefuMsgUrl = 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token={ACCESS_TOKEN}';
    this.getUserListUrl = 'https://api.weixin.qq.com/cgi-bin/user/get?access_token={ACCESS_TOKEN}&next_openid=';
    this.setCusMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token={ACCESS_TOKEN}';
    this.getCusMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/get?access_token={ACCESS_TOKEN}';
    this.delCusMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/delete?access_token={ACCESS_TOKEN}';
    this.createTicketUrl = 'https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token={ACCESS_TOKEN}';
    this.getTicketUrl = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket={TICKET}';
    this.url = options.url || '/';
    this.token = options.token || '';
    this.appid = options.appid || '';
    this.secret = options.secret || '';

    this.accessToken = '';
};

/**
 * 初使化
 * @param options
 * {
 *     token: ''    //自己在公共平台填写的token值
 * }
 * @returns {Weixin}
 */
Weixin.init = function (options) {
    return new Weixin(options);
};

/**
 * 解析消息错误
 * @returns {*}
 */
Weixin.prototype.handleMsgErr = function () {
    emitter.on('MsgErr', this.err);
    return this;
};

/**
 * 监听解析消息错误
 * @param callback
 * @returns {*}
 */
Weixin.prototype.errMsg = function (callback) {
    emitter.on('MsgErr', callback);
    return this;
};

/**
 * 处理文本消息
 * @returns {*}
 */
Weixin.prototype.handleTextMsg = function () {
    emitter.emit('TextMsg', this.msg);
    return this;
};

/**
 * 监听文本消息
 * @param callback
 * @returns {*}
 */
Weixin.prototype.textMsg = function (callback) {
    emitter.on('TextMsg', callback);
    return this;
};

/**
 * 处理图片消息
 * @returns {*}
 */
Weixin.prototype.handleImageMsg = function () {
    emitter.emit('ImageMsg', this.msg);
    return this;
};

/**
 * 监听图片消息
 * @param callback
 * @returns {*}
 */
Weixin.prototype.imageMsg = function (callback) {
    emitter.on('ImageMsg', callback);
    return this;
};

/**
 * 处理语音消息
 * @returns {*}
 */
Weixin.prototype.handleVoiceMsg = function () {
    emitter.emit('VoiceMsg', this.msg);
    return this;
};

/**
 * 监听语音消息
 * @param callback
 * @returns {*}
 */
Weixin.prototype.voiceMsg = function (callback) {
    emitter.on('VoiceMsg', callback);
    return this;
};

/**
 * 处理视频消息
 * @returns {*}
 */
Weixin.prototype.handleVideoMsg = function () {
    emitter.emit('VideoMsg', this.msg);
    return this;
};

/**
 * 监听视频消息
 * @param callback
 * @returns {*}
 */
Weixin.prototype.videoMsg = function (callback) {
    emitter.on('VideoMsg', callback);
    return this;
};

/**
 * 处理位置消息
 * @returns {*}
 */
Weixin.prototype.handleLocationMsg = function () {
    emitter.emit('LocationMsg', this.msg);
    return this;
};

/**
 * 监听位置消息
 * @param callback
 * @returns {*}
 */
Weixin.prototype.locationMsg = function (callback) {
    emitter.on('LocationMsg', callback);
    return this;
};

/**
 * 处理位置消息
 * @returns {*}
 */
Weixin.prototype.handleLinkMsg = function () {
    emitter.emit('LinkMsg', this.msg);
    return this;
};

/**
 * 监听位置消息
 * @param callback
 * @returns {*}
 */
Weixin.prototype.linkMsg = function (callback) {
    emitter.on('LinkMsg', callback);
    return this;
};

/**
 * 处理事件消息
 * @returns {*}
 */
Weixin.prototype.handleEventMsg = function () {
    var event = this.msg.Event;
    switch (event) {
        case 'subscribe':
            this.handleSubEventMsg();
            break;
        case 'unsubscribe':
            this.handleUnsubEventMsg();
            break;
        case 'scan':
            this.handleScanEventMsg();
            break;
        case 'ENTER':
            this.handleEnterEventMsg();
            break;
        case 'LOCATION':
            this.handleLocationEventMsg();
            break;
        case 'CLICK':
            this.handleClickEventMsg();
            break;
    }

    return this;
};

/**
 * 处理订阅事件消息
 * @returns {*}
 */
Weixin.prototype.handleSubEventMsg = function () {
    // 扫码，未关注，先关注后发场景值
    emitter.emit('SubEventMsg', this.msg);
    return this;
};

/**
 * 监听订阅事件消息
 * @param callback
 * @returns {*}
 */
Weixin.prototype.subEventMsg = function (callback) {
    emitter.on('SubEventMsg', callback);
    return this;
};

/**
 * 处理取消订阅事件消息
 * @returns {*}
 */
Weixin.prototype.handleUnsubEventMsg = function () {
    emitter.emit('UnSubEventMsg', this.msg);
    return this;
};

/**
 * 监听取消订阅事件
 * @param callback
 * @returns {*}
 */
Weixin.prototype.unsubEventMsg = function (callback) {
    emitter.on('UnSubEventMsg', callback);
    return this;
};

/**
 * 处理扫码事件消息
 * @returns {*}
 */
Weixin.prototype.handleScanEventMsg = function () {
    emitter.emit('ScanEventMsg', this.msg);
    return this;
};

/**
 * 监听扫码事件
 * @param callback
 * @returns {*}
 */
Weixin.prototype.scanEventMsg = function (callback) {
    emitter.on('ScanEventMsg', callback);
    return this;
};

/**
 * 处理进入会话事件消息
 * @returns {*}
 */
Weixin.prototype.handleEnterEventMsg = function () {
    emitter.emit('EnterEventMsg', this.msg);
    return this;
};

/**
 * 监听进入会话事件
 * @param callback
 * @returns {*}
 */
Weixin.prototype.enterEventMsg = function (callback) {
    emitter.on('EnterEventMsg', callback);
    return this;
};

/**
 * 处理上报地理位置消息
 * @returns {*}
 */
Weixin.prototype.handleLocationEventMsg = function () {
    emitter.emit('LocationEventMsg', this.msg);
    return this;
};

/**
 * 监听上报地理位置消息
 * @param callback
 * @returns {*}
 */
Weixin.prototype.locationEventMsg = function (callback) {
    emitter.on('LocationEventMsg', callback);
    return this;
};

/**
 * 处理自定义菜单事件
 * @returns {*}
 */
Weixin.prototype.handleClickEventMsg = function () {
    emitter.emit('clickEventMsg', this.msg);
    return this;
};

/**
 * 监听自定义菜单事件
 * @param callback
 * @returns {*}
 */
Weixin.prototype.clickEventMsg = function (callback) {
    emitter.on('clickEventMsg', callback);
    return this;
};

/**
 * 接收消息解析
 */
Weixin.prototype.analysisMsg = function () {
    if (this.err) {
        this.handleMsgErr();
    } else {
        var MsgType = this.msg.MsgType;
        switch (MsgType) {
            case 'text':
                this.handleTextMsg();   //文本消息
                break;
            case 'image':
                this.handleImageMsg();  //图片消息
                break;
            case 'voice':
                this.handleVoiceMsg();  //语音消息
                break;
            case 'video':
                this.handleVideoMsg();  //视频消息
                break;
            case 'location':
                this.handleLocationMsg();   //地理位置消息
                break;
            case 'link':
                this.handleLinkMsg();   //链接消息
                break;
            case 'event':
                this.handleEventMsg();  //事件消息
                break;
        }
    }
};

/**
 * 洗下数据，数组取第一个
 * @param json
 * @returns {*}
 */
Weixin.prototype.parseJson = function (json) {
    for (var key in json) {
        json[key] = json[key] instanceof Array ? json[key][0] : json[key];
    }
    return json;
};

/**
 * 接收消息
 * @param req
 * @param res
 */
Weixin.prototype.getMsg = function (req, res) {
    var bufferHelper = new BufferHelper();
    var _this = this;
    _this.res = res;
    req.setEncoding('utf-8');
    req.on('data', function (chunk) {
        bufferHelper.concat(chunk);
    });
    req.on('end', function () {
        xml2js.parseString(bufferHelper.toBuffer().toString(), function (err, json) {
            if (err) {
                _this.err = err;
            } else {
                _this.msg = _this.parseJson(json.xml);
            }
            _this.analysisMsg();
        });
    });
};

/**
 * 服务器请请该接口，发送三个参数，本地经过流程判断有效性
 * 验证权限
 * @param req
 * @returns {boolean}
 */
Weixin.prototype.signature = function (req) {
    var signature = req.query.signature;    //服务器签名
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;

    var tmpArray = [this.token, timestamp, nonce];
    tmpArray.sort();

    this.sha1Str = sha1(tmpArray.join(''));

    if (this.sha1Str == signature) {
        return true;
    } else {
        return false;
    }
};

/**
 * 被动回复消息
 * @param msg
 */
Weixin.prototype.postMsg = function (msg) {
    var MsgType = msg.MsgType;
    var weixinTmpl = weixinMsgXml[MsgType];
    for (var k in msg) {
        var reg = new RegExp('{' + k + '}', 'g');
        weixinTmpl = weixinTmpl.replace(reg, msg[k]);
    }
    if (MsgType == 'news') {
        var items = '';
        for (var i = 0; i < msg.Articles.length; i++) {
            var tmp = weixinMsgXml['item'];
            for (var item in msg.Articles[i]) {
                var regNews = new RegExp('{' + item + '}', 'g');
                tmp = tmp.replace(regNews, msg.Articles[i][item]);
            }
            items += tmp;
        }
        weixinTmpl = weixinTmpl.replace('{ArticleCount}', Object.keys(msg.Articles).length);
        weixinTmpl = weixinTmpl.replace('{items}', items);
    }
    this.res.type('xml');
    this.res.send(weixinTmpl);
};

/**
 * 以上接收订阅号的事件
 * ==================================================================================================================
 * 以下是高级接口，需要申请了公众号才可使用
 */

/**
 * 获取access token
 */
Weixin.prototype.getAccessToken = function (callback) {
    var url = this.accessTokenUrl.replace('{APPID}', this.appid).replace('{APPSECRET}', this.secret);
    httpHandle(url, 'GET', {}, {}, function (r) {
        if (callback) {
            callback(r);
        }
    });
};

/**
 * 发送客服消息
 * @param data 客服消息内容
 * @param callback
 */
Weixin.prototype.postKefuMsg = function (data, callback) {
    var url = this.postKefuMsgUrl.replace(/{ACCESS_TOKEN}/g, this.accessToken);
    httpHandle(url, 'POST', {}, data, function (r) {
        if (callback) {
            callback(r);
        }
    });
};

/**
 *  取用户信息
 * @param callback
 */
Weixin.prototype.getUserList = function (callback) {
    var url = this.getUserListUrl.replace(/{ACCESS_TOKEN}/g, this.accessToken);
    httpHandle(url, 'GET', {}, {}, function (r) {
        if (callback) {
            callback(r);
        }
    });
};

/**
 * 创建自定义菜单
 * @param data  菜单信息
 * @param callback
 */
Weixin.prototype.setCusMenu = function (data, callback) {
    var url = this.setCusMenuUrl.replace(/{ACCESS_TOKEN}/g, this.accessToken);
    httpHandle(url, 'POST', {}, data, function (r) {
        if (callback) {
            callback(r);
        }
    });
};

/**
 * 获取自定义菜单
 * @param callback
 */
Weixin.prototype.getCusMenu = function (callback) {
    var url = this.getCusMenuUrl.replace(/{ACCESS_TOKEN}/g, this.accessToken);
    httpHandle(url, 'GET', {}, {}, function (r) {
        if (callback) {
            callback(r);
        }
    });
};

/**
 * 删除自定义菜单
 * @param callback
 */
Weixin.prototype.delCusMenu = function (callback) {
    var url = this.delCusMenuUrl.replace(/{ACCESS_TOKEN}/g, this.accessToken);
    httpHandle(url, 'GET', {}, {}, function (r) {
        if (callback) {
            callback(r);
        }
    });
};

/**
 * 创建二维码
 * @param data
 * 临时二维码： {"expire_seconds": 1800, "action_name": "QR_SCENE", "action_info": {"scene": {"scene_id": 123}}}
 * 永久二维码： {"action_name": "QR_LIMIT_SCENE", "action_info": {"scene": {"scene_id": 123}}}
 * @param callback
 */
Weixin.prototype.createTicket = function (data, callback) {
    var url = this.createTicketUrl.replace(/{ACCESS_TOKEN}/g, this.accessToken);
    httpHandle(url, 'POST', {}, data, function (r) {
        if (callback) {
            callback(r);
        }
    });
};

/**
 * 获取二维码的地址
 * @param callback
 */
Weixin.prototype.getTicket = function (ticket, callback) {
    var url = this.getTicketUrl.replace(/{TICKET}/g, ticket);
    callback(url);
};

module.exports = Weixin;