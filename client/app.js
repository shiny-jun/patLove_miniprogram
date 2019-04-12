//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
// var qiniu = require('https://unpkg.com/qiniu-js@2.5.4/dist/qiniu.min')
// import 'https://unpkg.com/qiniu-js@2.5.4/dist/qiniu.min.js'
App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
        // qiniu.conf.ACCESS_KEY = '-p-H0V4SZpElZn8FOBSS-X1L--ckIddnLVgK4m21'
        // qiniu.conf.SECRET_KEY = 'TnHSnKxjOOcgl6saXSHZ0oU9DjHsSl5X9ys2H5LX'
    }
})