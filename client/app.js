//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
import {
    get
} from "./utils/index.js";
const regeneratorRuntime = require('./utils/regenerator-runtime/runtime')
// var qiniu = require('https://unpkg.com/qiniu-js@2.5.4/dist/qiniu.min')
// import 'https://unpkg.com/qiniu-js@2.5.4/dist/qiniu.min.js'
App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
        //获取token
        this.getToken()
        this.getUserInfo()
    },
    async getToken() {
        const token = await get("/weapp/qiniu", {});
        console.log('token', token)
        wx.setStorageSync('token', token)
    },
    getUserInfo(){
          let userInfoStr = wx.getStorageSync('userInfo')
          console.log(111111111111)
          console.log(userInfoStr)
          if (userInfoStr) {
            let userInfo = JSON.parse(userInfoStr)
            this.globalData.openId = userInfo.openId
            this.globalData.avatarUrl = userInfo.avatarUrl
            this.globalData.nickName = userInfo.nickName
            this.globalData.gender = userInfo.gender
            this.globalData.city = userInfo.city
          }
        },
    globalData: {
        openId: null,
        avatarUrl:null,
        nickName:null,
        gender:null,
        city:null
    },

})