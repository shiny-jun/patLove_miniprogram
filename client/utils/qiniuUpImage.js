const qiniuUploader = require("./qiniuUploader");
//index.js

// 初始化七牛相关参数
// export function initQiniu() {
//   var options = {
//     region: 'ECN', // 华北区
//     uptokenURL: 'https://shiny-jun.cn/api/uptoken', //请求后端uptoken的url地址
//     //uptoken: 'xxx',  //你请求后端的uptoken,和上面一样的，uptokenURL不填就找uptoken,填一个就可以了（这里是字符串数据不是url了）
//     domain: 'http://ppq8kswcf.bkt.clouddn.com', //yourBucketId:这个去你域名配置那里要
//     shouldUseQiniuFileName: false,
//     //key: '' 
//   };
//   qiniuUploader.init(options);
// }
// export function initQiniu(filePath){
//   qiniuUploader.upload(filePath, (res) => {

//   that.setData({

//     'imageURL': res.imageURL,

//   });

// }, (error) => {

//   console.log('error: ' + error);

// }, {

//   uploadURL: 'https://up.qbox.me',

//   domain: 'https://ppq8kswcf.bkt.clouddn.com',

//   uptokenURL: 'https://shiny-jun.cn/api/uptoken',

// })
// }
function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
  return putPolicy.token();
}



//构造上传函数
export function uploadFile(key, localFile) {
  // key:上传到七牛后保存的文件名
  // localFile:要上传文件的本地路径
  let bucket = 'patlove'
  let uptoken = uptoken(bucket, key);
  var extra = new qiniu.io.PutExtra();
  qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
    if (!err) {
      // 上传成功， 处理返回值
      console.log(ret.hash, ret.key, ret.persistentId);
    } else {
      // 上传失败， 处理返回代码
      console.log(err);
    }
  });
}