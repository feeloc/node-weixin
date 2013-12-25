[![Build Status](https://travis-ci.org/JeremyWei/weixin_api.png)](https://travis-ci.org/feeloc/node-weixin)
node-weixin
==========

微信公众平台[消息接口](http://mp.weixin.qq.com/wiki/index.php?title=%E6%B6%88%E6%81%AF%E6%8E%A5%E5%8F%A3%E6%8C%87%E5%8D%97)的Node.js实现。

Installation
===========

如果你使用node进行开发，那么安装很简单：
```bash
npm install node-weixin
```

如果是订阅号，可以使用基础接口
```bash
var weixin = require('node-weixin').init({
    url: '/',
    token: ''
});

weixin.errMsg(function (err) {
    console.log(err);
});

/**
 * 监听广本消息
 */
weixin.textMsg(function (msg) {
    weixin.postMsg({
        FromUserName: msg.ToUserName,
        ToUserName: msg.FromUserName,
        CreateTime: new Date().getTime(),
        MsgType: 'text',
        Content: '哈哈'   //广本内容
    });
    console.log(msg);
});

/**
 * 监听图片消息
 */
weixin.imageMsg(function (msg) {
    weixin.postMsg({
        FromUserName: msg.ToUserName,
        ToUserName: msg.FromUserName,
        CreateTime: new Date().getTime(),
        MsgType: 'image',
        MediaId: msg.MediaId
    });
    console.log(msg);
});

/**
 * 监听语音消息
 */
weixin.voiceMsg(function (msg) {
    weixin.postMsg({
        FromUserName: msg.ToUserName,
        ToUserName: msg.FromUserName,
        CreateTime: new Date().getTime(),
        MsgType: 'voice',
        MediaId: msg.MediaId
    });
    console.log(msg);
});

/**
 * 监听视频消息
 */
weixin.videoMsg(function (msg) {
    weixin.postMsg({
        FromUserName: msg.ToUserName,
        ToUserName: msg.FromUserName,
        CreateTime: new Date().getTime(),
        MsgType: 'video',
        MediaId: msg.MediaId,
        ThumbMediaId: msg.ThumbMediaId
    });
    console.log(msg);
});

/**
 * 监听上报地理位置消息
 */
weixin.locationMsg(function (msg) {
    weixin.postMsg({
        FromUserName: msg.ToUserName,
        ToUserName: msg.FromUserName,
        CreateTime: new Date().getTime(),
        MsgType: 'music',
        Title: '果果的原创音乐',
        Description: '果果的原创音乐介绍',
        MusicUrl: 'http://qiniu.tuhuangzhe.com/audio/%E7%9B%B8%E6%80%9D%E5%90%9F2.wav?avthumb/mp3/ab/192k',
        HQMusicUrl: 'http://qiniu.tuhuangzhe.com/audio/%E7%9B%B8%E6%80%9D%E5%90%9F2.wav?avthumb/mp3/ab/250k',
        ThumbMediaId: ThumbMediaId //要使用自己上传的一张图的MediaId
    });
    console.log(msg);
});

/**
 * 监听链接消息
 */
weixin.linkMsg(function (msg) {
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

/**
 * 点击关注
 */
weixin.subEventMsg(function (msg) {
    console.log(msg);
});

/**
 * 取消关注
 */
weixin.unsubEventMsg(function (msg) {
    console.log(msg);
});

/**
 * 扫自定义二维码
 */
weixin.scanEventMsg(function (msg) {
    console.log(msg);
});

/**
 * 进入会话
 */
weixin.enterEventMsg(function (msg) {
    console.log(msg);
});

/**
 * 上报地理位置
 */
weixin.locationEventMsg(function (msg) {
    console.log(msg);
});

/**
 * 点击自定义菜单事件
 */
weixin.clickEventMsg(function (msg) {
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


如果是公众号，可以使用高级接口，当然订阅号的接口都可以使用
```bash
var weixin = require('node-weixin').init({
    url: '/',
    token: '',
    appid: '',
    secret: ''
});

/**
* 获取access_token，7200S过期一次，可以放缓存中，陪两小时重新获取下
*/
weixin.getAccessToken(function (r) {
    console.log(r);
});

//发送客服文本消息
var data = {
    'touser': 'oMjrktwd14JaPBIC75QViXPLXjZ4',
    'msgtype': 'text',
    'text': {
        'content': '莫慌张，这是一条客服消息'
    }
};
weixin.postKefuMsg(data, function (r) {
    console.log(r);
});

//发送客服图片消息
var data = {
    "touser": "oMjrktwd14JaPBIC75QViXPLXjZ4",
    "msgtype": "image",
    "image": {
        "media_id": MediaId
    }
};
weixin.postKefuMsg(data, function (r) {
    console.log(r);
});

//发送客服语音消息
var data = {
    "touser": "oMjrktwd14JaPBIC75QViXPLXjZ4",
    "msgtype": "voice",
    "voice": {
        "media_id": MediaId
    }
};
weixin.postKefuMsg(data, function (r) {
    console.log(r);
});

//发送客服视频消息
var data = {
    "touser": "oMjrktwd14JaPBIC75QViXPLXjZ4",
    "msgtype": "video",
    "video": {
        "media_id": MediaId,
        "title": "Title",
        "description": "Description"
    }
};
weixin.postKefuMsg(data, function (r) {
    console.log(r);
});

//发送客服音乐消息
var data = {
    "touser": "oMjrktwd14JaPBIC75QViXPLXjZ4",
    "msgtype": "music",
    "music": {
        "title": "果果的原创音乐",
        "description": "果果的原创音乐介绍",
        "musicurl": "http://qiniu.tuhuangzhe.com/audio/%E7%9B%B8%E6%80%9D%E5%90%9F2.wav?avthumb/mp3/ab/192k",
        "hqmusicurl": "http://qiniu.tuhuangzhe.com/audio/%E7%9B%B8%E6%80%9D%E5%90%9F2.wav?avthumb/mp3/ab/250k",
        "thumb_media_id": ThumbMediaId
    }
};
weixin.postKefuMsg(data, function (r) {
    console.log(r);
});

//发送客服图文消息
var data = {
    "touser": "oMjrktwd14JaPBIC75QViXPLXjZ4",
    "msgtype": "news",
    "news": {
        "articles": [
            {
                "title": "客服消息",
                "description": "客服消息aa",
                "url": "http://blog.feeloc.cn",
                "picurl": "http://feeloc08.u.qiniudn.com/1385473580021/1385473580021.jpg?imageView/2/w/320"
            },
            {
                "title": "客服消息",
                "description": "客服消息bb",
                "url": "http://blog.feeloc.cn",
                "picurl": "http://feeloc08.u.qiniudn.com/1385473580021/1385473580021.jpg?imageView/2/w/320"
            }
        ]
    }
};
weixin.postKefuMsg(data, function (r) {
    console.log(r);
});

/**
 * 点击自定义菜单事件
 */
weixin.clickEventMsg(function (msg) {
    //发送客服文本消息
    var data = {
        'touser': 'oMjrktwd14JaPBIC75QViXPLXjZ4',
        'msgtype': 'text',
        'text': {
            'content': '你丫干嘛点我'
        }
    };
    weixin.postKefuMsg(data, function (r) {
        console.log(r);
    });
    console.log(msg);
});

/**
 * 设置自定义菜单
 */
weixin.setCusMenu({
    "button": [
        {
            "type": "click",
            "name": "今日歌曲",
            "key": "V1001_TODAY_MUSIC"
        },
        {
            "name": "菜单",
            "sub_button": [
                {
                    "type": "view",
                    "name": "搜索",
                    "url": "http://www.soso.com/"
                },
                {
                    "type": "view",
                    "name": "视频",
                    "url": "http://v.qq.com/"
                },
                {
                    "type": "click",
                    "name": "赞一下我们",
                    "key": "V1001_GOOD"
                }
            ]
        }
    ]
}, function (r) {
    console.log(r);
});

/**
 * 获取自定义菜单
 */
weixin.getCusMenu(function (r) {
    console.log(r);
});

/**
 * 删除自定义菜单
 */
weixin.delCusMenu(function (r) {
    console.log(r);
});

/**
 * 获得用户列表
 */
weixin.getUserList(function (r) {
    console.log(r);
});
```

LICENSE
===========
The MIT License (MIT)
Copyright (c) 2013 feeloc

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.