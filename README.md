[![Build Status](https://travis-ci.org/JeremyWei/weixin_api.png)](https://travis-ci.org/feeloc/node-weixin)
node-weixin
==========

微信公众平台[消息接口](http://mp.weixin.qq.com/wiki/index.php?title=%E6%B6%88%E6%81%AF%E6%8E%A5%E5%8F%A3%E6%8C%87%E5%8D%97)的Node.js实现。

Installation
===========

如果你使用node进行开发，那么安装很简单：
```bash
npm install node-weixin

var weixin = require('node-weixin').init({
    url: '/',
    token: '',
    appid: '',
    secret: ''
});

//如果是公共号，就获取下access token
weixin.accessToken(function (r) {
    console.log(r);
});

weixin.errMsg(function (err) {
    console.log(err);
});

weixin.textMsg(function (msg) {
    weixin.postMsg({
        FromUserName: msg.ToUserName,
        ToUserName: msg.FromUserName,
        CreateTime: new Date().getTime(),
        MsgType: 'text',
        Content: ''
    });
    console.log(msg);
});

weixin.imageMsg(function (msg) {
    weixin.postMsg({
        FromUserName: msg.ToUserName,
        ToUserName: msg.FromUserName,
        CreateTime: new Date().getTime(),
        MsgType: 'image',
        MediaId: '10001001'
    });
    console.log(msg);
});

weixin.voiceMsg(function (msg) {
    weixin.postMsg({
        FromUserName: msg.ToUserName,
        ToUserName: msg.FromUserName,
        CreateTime: new Date().getTime(),
        MsgType: 'news',
        Articles: [
            {
                Title: 'aa',
                Description: 'bb',
                PicUrl: 'http://feeloc08.u.qiniudn.com/1385473580021/1385473580021.jpg?imageView/2/w/320',
                Url: 'http://blog.feeloc.cn'
            },
            {
                Title: 'aa',
                Description: 'bb',
                PicUrl: 'http://feeloc08.u.qiniudn.com/1385473580021/1385473580021.jpg?imageView/2/w/320',
                Url: 'http://blog.feeloc.cn'
            }
        ]
    });
    console.log(msg);
});

weixin.videoMsg(function (msg) {
    console.log(msg);
});

weixin.locationMsg(function (msg) {
    console.log(msg);
});

weixin.linkMsg(function (msg) {
    console.log(msg);
});

weixin.scanEventMsg(function (msg) {
    console.log(msg);
});

weixin.enterEventMsg(function (msg) {
    console.log(msg);
});

exports.token = function (req, res) {
    if (weixin.signature(req)) {
        res.send(200, req.query.echostr);
    } else {
        res.send(200, 'fail');
    }
};

exports.msg = function (req, res) {
    weixin.getMsg(req, res);
};
```

LICENSE
===========
The MIT License (MIT)
Copyright (c) 2013 feeloc

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

