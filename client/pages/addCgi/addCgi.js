//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
import util from "../../utils/util";

Page({
  data: {
    requestResult: '',
    canIUseClipboard: wx.canIUse('setClipboardData')
  },

  onLoad: function(options) {
    new util(this);
  },

  testCgi: function() {
    this.showBusy('请求中...')
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/demo`,
      login: false,
      success(result) {
        this.showSuccess('请求成功完成')
        that.setData({
          requestResult: JSON.stringify(result.data)
        })
      },
      fail(error) {
        this.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  },

  copyCode: function(e) {
    var codeId = e.target.dataset.codeId
    wx.setClipboardData({
      data: code[codeId - 1],
      success: function() {
        this.showSuccess('复制成功')
      }
    })
  }
})

var code = [
  `router.get('/demo', controllers.demo)`,
  `module.exports = ctx => {
    ctx.state.data = {
        msg: 'Hello World'
    }
}`
]