const https = require('https')
module.exports = (ctx) => {
  var accessKey = '-p-H0V4SZpElZn8FOBSS-X1L--ckIddnLVgK4m21';
  var secretKey = 'TnHSnKxjOOcgl6saXSHZ0oU9DjHsSl5X9ys2H5LX';
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  
  var options = {
    scope: 'patlove',
  };
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken = await putPolicy.uploadToken(mac);
  console.log('uploadToken', uploadToken)
  ctx.state.data = uploadToken
}