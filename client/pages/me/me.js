// pages/me/me.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
import util from "../../utils/util";

Page({
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    current:1
  },
  onLoad() {
    new util(this);
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

    this.showBusy('正在登录')

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
          this.showSuccess('登录成功')
          //todo:登录成功后，需要通过openId去获取本用户在本服务器的个人资料，宠物资料等
          console.log(res)
          let userInfoStr = JSON.stringify(res)
          console.log(userInfoStr)
          wx.setStorageSync('userInfo', userInfoStr)
        },
        fail: err => {
          console.error(err)
          this.showModel('登录错误', err.message)
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
          this.showSuccess('登录成功')
          //todo：首次登录，应该吧资料上传到我们本地服务器。配置一些默认资料，如个性签名
          console.log(res)
          let userInfoStr = JSON.stringify(res)
          console.log(userInfoStr)
          wx.setStorageSync('userInfo', userInfoStr)
        },
        fail: err => {
          console.error(err)
          this.showModel('登录错误', err.message)
        }
      })
    }
  },
  // 用于切换current
  changeCurrent(e){
    this.setData({
      current: e.currentTarget.dataset.current
    })
  },
  gotoCreatePatData(){
    wx.navigateTo({
      url: '../createPatData/createPatData',
    })
  },
  gotoUserDataEdit(){
    wx.navigateTo({
      url: `../userDataEdit/userDataEdit`,
    }) 
  }
})