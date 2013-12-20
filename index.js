var Weixin = function (options) {

};

Weixin.prototype.init = function (options) {
    return new Weixin(options);
};

/**
 * 验证权限
 */
Weixin.prototype.signature = function () {
    console.log('测试方法');
};

module.exports = Weixin;