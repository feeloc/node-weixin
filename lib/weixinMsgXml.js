/**
 * Created with IntelliJ IDEA.
 * User: hujianmeng
 * Date: 13-12-23
 * Time: 下午12:40
 * To change this template use File | Settings | File Templates.
 */

exports.weixinMsgXml = {
    text: '<xml>' +
        '<ToUserName><![CDATA[{ToUserName}]]></ToUserName>' +
        '<FromUserName><![CDATA[{FromUserName}]]></FromUserName>' +
        '<CreateTime>{CreateTime}</CreateTime>' +
        '<MsgType><![CDATA[text]]></MsgType>' +
        '<Content><![CDATA[{Content}]]></Content>' +
        '</xml>',
    image: '<xml>' +
        '<ToUserName><![CDATA[{ToUserName}]]></ToUserName>' +
        '<FromUserName><![CDATA[{FromUserName}]]></FromUserName>' +
        '<CreateTime>{CreateTime}</CreateTime>' +
        '<MsgType><![CDATA[image]]></MsgType>' +
        '<Image>' +
            '<MediaId><![CDATA[{MediaId}]]></MediaId>' +
        '</Image>' +
        '</xml>',
    voice: '<xml>' +
        '<ToUserName><![CDATA[{ToUserName}]]></ToUserName>' +
        '<FromUserName><![CDATA[{FromUserName}]]></FromUserName>' +
        '<CreateTime>{CreateTime}</CreateTime>' +
        '<MsgType><![CDATA[voice]]></MsgType>' +
        '<Voice>' +
            '<MediaId><![CDATA[{MediaId}]]></MediaId>' +
        '</Voice>' +
        '</xml>',
    video: '<xml>' +
        '<ToUserName><![CDATA[{ToUserName}]]></ToUserName>' +
        '<FromUserName><![CDATA[{FromUserName}]]></FromUserName>' +
        '<CreateTime>{CreateTime}</CreateTime>' +
        '<MsgType><![CDATA[video]]></MsgType>' +
        '<Video>'+
            '<MediaId><![CDATA[{MediaId}]]></MediaId>'+
            '<ThumbMediaId><![CDATA[{ThumbMediaId}]]></ThumbMediaId>' +
        '</Video>'+
        '</xml>',
    music: '<xml>' +
        '<ToUserName><![CDATA[{ToUserName}]]></ToUserName>' +
        '<FromUserName><![CDATA[{FromUserName}]]></FromUserName>' +
        '<CreateTime>{CreateTime}</CreateTime>' +
        '<MsgType><![CDATA[music]]></MsgType>' +
        '<Music>' +
            '<Title><![CDATA[{Title}]]></Title>' +
            '<Description><![CDATA[{Description}]]></Description>' +
            '<MusicUrl><![CDATA[{MusicUrl}]]></MusicUrl>' +
            '<HQMusicUrl><![CDATA[{HQMusicUrl}]]></HQMusicUrl>' +
            '<ThumbMediaId><![CDATA[{ThumbMediaId}]]></ThumbMediaId>' +
        '</Music>' +
        '</xml>',
    news: '<xml>' +
        '<ToUserName><![CDATA[{ToUserName}]]></ToUserName>' +
        '<FromUserName><![CDATA[{FromUserName}]]></FromUserName>' +
        '<CreateTime>{CreateTime}</CreateTime>' +
        '<MsgType><![CDATA[news]]></MsgType>' +
        '<ArticleCount>{ArticleCount}</ArticleCount>' +
        '<Articles>' +
            '{items}' +
        '</Articles>' +
        '</xml>',
    item: '<item>' +
        '<Title><![CDATA[{Title}]]></Title>' +
        '<Description><![CDATA[{Description}]]></Description>' +
        '<PicUrl><![CDATA[{PicUrl}]]></PicUrl>' +
        '<Url><![CDATA[{Url}]]></Url>' +
        '</item>'
};