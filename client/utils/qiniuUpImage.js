const qiniuUploader = require("./qiniuUploader");
//index.js

// 初始化七牛相关参数
export function initQiniu() {
  var options = {
    region: 'ECN', // 华北区
    uptoken:getToken(),
    // domain: 'http://ppq8kswcf.bkt.clouddn.com', //yourBucketId:这个去你域名配置那里要
    shouldUseQiniuFileName: false,
  };
  qiniuUploader.updateConfigWithOptions(options);
}

async function getToken() {
  return token = await get("/weapp/qiniu", {});
}

//构造上传函数
export function uploadFile(key, localFile) {
  // key:上传到七牛后保存的文件名
  // localFile:要上传文件的本地路径
  var extra = new qiniu.io.PutExtra();
  qiniu.io.putFile(getToken(), key, localFile, extra, function (err, ret) {
    if (!err) {
      // 上传成功， 处理返回值
      console.log(ret.hash, ret.key, ret.persistentId);
    } else {
      // 上传失败， 处理返回代码
      console.log(err);
    }
  });
}