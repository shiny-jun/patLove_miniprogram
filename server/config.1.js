const CONF = {
  port: '5757',
  rootPathname: '',

  // 微信小程序 App ID
  appId: 'wx9ccb262232e0729a',

  // 微信小程序 App Secret
  appSecret: '24a8addcef4a4284b60498c8a79e46f5',

  // 是否使用腾讯云代理登录小程序
  useQcloudLogin: false,

  /**
   * MySQL 配置，用来存储 session 和用户信息
   * 若使用了腾讯云微信小程序解决方案
   * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
   */
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    db: 'cAuth',
    pass: 'wx9ccb262232e0729a',
    char: 'utf8mb4'
  },

  cos: {
    /**
     * 地区简称
     * @查看 https://cloud.tencent.com/document/product/436/6224
     */
    region: 'ap-guangzhou',
    // Bucket 名称
    fileBucket: 'qcloudtest',
    // 文件夹
    uploadFolder: ''
  },

  // 微信登录态有效期
  wxLoginExpires: 7200,
  wxMessageToken: 'abcdefgh',
  qcloudAppId: '1256631107',
  qcloudSecretId: 'AKIDtiohV9Q8NZJyaCnaRzTxPn2Af6QZZYfc',
  qcloudSecretKey: 'AC3iDbv8B5oOn94tpopfOCuRxHPNDPWS',
}

module.exports = CONF