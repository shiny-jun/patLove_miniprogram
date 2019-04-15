const https = require('https')
const qiniu = require('qiniu')
module.exports = async (ctx) => {
  let accessKey = '-p-H0V4SZpElZn8FOBSS-X1L--ckIddnLVgK4m21';
  let secretKey = 'TnHSnKxjOOcgl6saXSHZ0oU9DjHsSl5X9ys2H5LX';
  let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  
  let options = {
    scope: 'patlove',
  };
  let putPolicy = new qiniu.rs.PutPolicy(options);
  let uploadToken = await putPolicy.uploadToken(mac);
  console.log('uploadToken', uploadToken)
  ctx.state.data = uploadToken
  // ctx.state.data = {detail:'hello'}
}