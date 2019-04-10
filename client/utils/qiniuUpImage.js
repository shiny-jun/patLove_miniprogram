
const qiniuUploader = require("./qiniuUploader");
//index.js

// 初始化七牛相关参数
export function initQiniu() {
  var options = {
    region: 'ECN', // 华北区
    uptokenURL: 'https://shiny-jun.cn/api/uptoken', //请求后端uptoken的url地址
    //uptoken: 'xxx',  //你请求后端的uptoken,和上面一样的，uptokenURL不填就找uptoken,填一个就可以了（这里是字符串数据不是url了）
    domain: 'http://ppq8kswcf.bkt.clouddn.com', //yourBucketId:这个去你域名配置那里要
    shouldUseQiniuFileName: false,
    //key: '' 
  };
  qiniuUploader.init(options);
}
