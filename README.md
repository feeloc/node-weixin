[![Build Status](https://travis-ci.org/JeremyWei/weixin_api.png)](https://travis-ci.org/JeremyWei/weixin_api)
weixin-api
==========

微信公众平台[消息接口](http://mp.weixin.qq.com/wiki/index.php?title=%E6%B6%88%E6%81%AF%E6%8E%A5%E5%8F%A3%E6%8C%87%E5%8D%97)的Node.js实现。

Installation
===========

如果你使用node进行开发，那么安装很简单：
```bash
  npm install weixin-api
```

Express
===========

如果你需要使用express开发微信公众平台应用，那么首先安装express
```bash
	npm install express -g
```

创建应用
```bash
	express myweixin
```

`cd myweixin`修改`package.json`，添加对`weixin-api`的依赖

```javascript
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "3.1.1",
    "jade": "*",
	"xml2js" : "0.2.6",
	"weixin-api" : ">=0.1.5"
  }
}
```

然后执行
```bash
	npm install
```

Features
===========
* token校验
* 消息推送：文本消息，图片消息，地理位置消息，链接消息，事件推送
* 消息回复：文本消息，音乐消息，图文消息

Links
===========

* [微信API For Node.js](http://weizhifeng.net/weixin-with-node.js.html)

Example
===========

```javascript
var express = require('express'),
	weixin = require('weixin-api'),
	app = express();

// 解析器
app.use(express.bodyParser());
//app.use(xmlBodyParser);

// 接入验证
app.get('/', function(req, res) {
		
	// 签名成功
	if (weixin.checkSignature(req)) {
		res.send(200, req.query.echostr);
	} else {
		res.send(200, 'fail');
	}
});

// config
weixin.token = '你的token';

// 监听文本消息
weixin.textMsg(function(msg) {
	console.log("textMsg received");
	console.log(JSON.stringify(msg));

	var resMsg = {};

	switch (msg.content) {
		case "文本" :
			// 返回文本消息
			resMsg = {
				fromUserName : msg.toUserName,
				toUserName : msg.fromUserName,
				msgType : "text",
				content : "这是文本回复",
				funcFlag : 0
			};
			break;
	
		case "音乐" :
			// 返回音乐消息
			resMsg = {
				fromUserName : msg.toUserName,
				toUserName : msg.fromUserName,
				msgType : "music",
				title : "音乐标题",
				description : "音乐描述",
				musicUrl : "音乐url",
				HQMusicUrl : "高质量音乐url",
				funcFlag : 0
			};
			break;
		
		case "图文" :
		
			var articles = [];
			articles[0] = {
				title : "PHP依赖管理工具Composer入门",
				description : "PHP依赖管理工具Composer入门",
				picUrl : "http://weizhifeng.net/images/tech/composer.png",
				url : "http://weizhifeng.net/manage-php-dependency-with-composer.html"
			};

			articles[1] = {
				title : "八月西湖",
				description : "八月西湖",
				picUrl : "http://weizhifeng.net/images/poem/bayuexihu.jpg",
				url : "http://weizhifeng.net/bayuexihu.html"
			};

			articles[2] = {
				title : "「翻译」Redis协议",
				description : "「翻译」Redis协议",
				picUrl : "http://weizhifeng.net/images/tech/redis.png",
				url : "http://weizhifeng.net/redis-protocol.html"
			};
	
			// 返回图文消息
			resMsg = {
				fromUserName : msg.toUserName,
				toUserName : msg.fromUserName,
				msgType : "news",
				articles : articles,
				funcFlag : 0
			}
	}

	weixin.sendMsg(resMsg);
});

// 监听图片消息
weixin.imageMsg(function(msg) {
	console.log("imageMsg received");
	console.log(JSON.stringify(msg));
});

// 监听位置消息
weixin.locationMsg(function(msg) {
	console.log("locationMsg received");
	console.log(JSON.stringify(msg));
});

// 监听链接消息
weixin.urlMsg(function(msg) {
	console.log("urlMsg received");
	console.log(JSON.stringify(msg));
});

// 监听事件消息
weixin.eventMsg(function(msg) {
	console.log("eventMsg received");
	console.log(JSON.stringify(msg));
});

// Start
app.post('/', function(req, res) {
	
	// loop
	weixin.loop(req, res);

});

app.listen(3000);
```

LICENSE
===========
The MIT License (MIT)
Copyright (c) 2012 Jeremy Wei

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

