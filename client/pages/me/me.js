// pages/me/me.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    current:1
  },
  onLoad() {
    let userInfoStr = wx.getStorageSync('userInfo')
    if(userInfoStr){
      let userInfo = JSON.parse(userInfoStr)
      this.setData({
        userInfo:userInfo,
        logged:true
      })
      wx.setNavigationBarTitle({
        title: userInfo.nickName
      })
    }
  },
  // 用户登录示例
  bindGetUserInfo() {
    if (this.data.logged) return

    util.showBusy('正在登录')

    const session = qcloud.Session.get()

    if (session) {
      // 第二次登录
      // 或者本地已经有登录态
      // 可使用本函数更新登录态
      qcloud.loginWithCode({
        success: res => {
          this.setData({
            userInfo: res,
            logged: true
          })
          util.showSuccess('登录成功')
          console.log(res)
          let userInfoStr = JSON.stringify(res)
          console.log(userInfoStr)
          wx.setStorageSync('userInfo', userInfoStr)
        },
        fail: err => {
          console.error(err)
          util.showModel('登录错误', err.message)
        }
      })
    } else {
      // 首次登录
      qcloud.login({
        success: res => {
          this.setData({
            userInfo: res,
            logged: true
          })
          util.showSuccess('登录成功')
          console.log(res)
          let userInfoStr = JSON.stringify(res)
          console.log(userInfoStr)
          wx.setStorageSync('userInfo', userInfoStr)
        },
        fail: err => {
          console.error(err)
          util.showModel('登录错误', err.message)
        }
      })
    }
  },
  // 用于切换current
  changeCurrent(e){
    this.setData({
      current: e.currentTarget.dataset.current
    })
  }
})