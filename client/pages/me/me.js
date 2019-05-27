// pages/me/me.js
let qcloud = require('../../vendor/wafer2-client-sdk/index')
let config = require('../../config')
import util from "../../utils/util";
import {
  get,
  post,
  showSuccess
} from "../../utils/index.js";
let app = getApp();
const regeneratorRuntime = require('../../utils/regenerator-runtime/runtime')
Page({
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    current: 1,
    noMore: false,
    pageSize: 10,
    pageNo: 0, // 从0开始
    articals: [],
    minorUserInfo: {}
  },
  onLoad() {
    new util(this);
    let userInfoStr = wx.getStorageSync('userInfo')
    if (userInfoStr) {
      let userInfo = JSON.parse(userInfoStr)
      this.setData({
        userInfo: userInfo,
        logged: true
      })
      app.globalData.openId = userInfo.openId
      app.globalData.avatarUrl = userInfo.avatarUrl
      app.globalData.nickName = userInfo.nickName
      app.globalData.gender = userInfo.gender
      app.globalData.city = userInfo.city
      wx.setNavigationBarTitle({
        title: userInfo.nickName
      })
      // 获取笔记列表
      this.getArticalList(userInfo.openId, () => {
        this._doRefreshMasonry(this.data.articals)
      })
      this.getminorUserInfo(userInfo.openId)
    }
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    this.setData({
      pageNo:0,
      noMore:false
    })
    wx.showNavigationBarLoading();
    // this.getToken()
    this.getArticalList(this.data.userInfo.openId, () => {
      this._doRefreshMasonry(this.data.articals)
    })
    this.getminorUserInfo(this.data.userInfo.openId)
    wx.stopPullDownRefresh();
  },
  // 用户登录示例
  bindGetUserInfo() {
    if (this.data.logged) return

    // this.showBusy('正在登录')

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
          showSuccess('登录成功')
          //todo:登录成功后，需要通过openId去获取本用户在本服务器的个人资料，宠物资料等
          console.log(res)
          let userInfoStr = JSON.stringify(res)
          console.log(userInfoStr)
          // this.markUserMsg(userInfoStr)
          wx.setStorageSync('userInfo', userInfoStr)
          app.globalData.openId = res.openId
          app.globalData.avatarUrl = res.avatarUrl
          app.globalData.nickName = res.nickName
          app.globalData.gender = res.gender
          app.globalData.city = res.city
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
          showSuccess('登录成功')
          //todo：首次登录，应该吧资料上传到我们本地服务器。配置一些默认资料，如个性签名
          console.log(res)
          let userInfoStr = JSON.stringify(res)
          console.log(userInfoStr)
          this.markUserMsg(userInfoStr)
          wx.setStorageSync('userInfo', userInfoStr)
          app.globalData.openId = res.openId
          app.globalData.avatarUrl = res.avatarUrl
          app.globalData.nickName = res.nickName
          app.globalData.gender = res.gender
          app.globalData.city = res.city
          // 获取笔记列表
          this.getArticalList(res.openId, () => {
            this._doRefreshMasonry(this.data.articals)
          })
          this.getminorUserInfo(res.openId)
        },
        fail: err => {
          console.error(err)
          this.showModel('登录错误', err.message)
        }
      })
    }
  },
  // 用于切换current
  changeCurrent(e) {
    let current = e.currentTarget.dataset.current
    this.setData({
      current
    })
    if(current==1){
      this.getArticalList(this.data.userInfo.openId, () => {
        this._doRefreshMasonry(this.data.articals)
      })
    } else {
      this.getLikeArticalList(this.data.userInfo.openId, () => {
        this._doRefreshMasonry(this.data.articals)
      })
    }
  },
  gotoPatData() {
    wx.navigateTo({
      url: 'myPatList/myPatList',
    })
  },
  gotoUserDataEdit() {
    wx.navigateTo({
      url: `../userDataEdit/userDataEdit`,
    })
  },
  // 去用户列表
  goUserList(e){
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: `../userList/userList?type=${type}&openId=${this.data.userInfo.openId}`,
    })
  },
  //获取笔记列表
  async getArticalList(openId, fn) {
    console.log(2)
    let params = {
      openId: openId,
    }
    params.pageSize = this.data.pageSize
    params.pageNo = this.data.pageNo
    const articals = await get("/weapp/articalList",
      params
    );
    console.log(articals)
    let noMore = false
    if (articals.list.length < this.data.pageSize) {
      noMore = true
    }
    this.setData({
      articals: articals.list,
      noMore
    })
    fn()
    wx.hideNavigationBarLoading();
  },
  //获取笔记列表
  async getLikeArticalList(openId, fn) {
    console.log(2)
    let params = {
      openId: openId,
    }
    params.pageSize = this.data.pageSize
    params.pageNo = this.data.pageNo
    const articals = await get("/weapp/likeArtical",
      params
    );
    console.log(articals)
    let noMore = false
    if (articals.list.length < this.data.pageSize) {
      noMore = true
    }
    this.setData({
      articals: articals.list,
      noMore
    })
    fn()
    wx.hideNavigationBarLoading();
  },
  async getminorUserInfo(openId) {
    let params = {
      openId: openId,
    }
    const minorUserInfo = await get("/weapp/minorUserInfo",
      params
    );
    console.log(minorUserInfo)
    this.setData({
      minorUserInfo: minorUserInfo.data

    })
  },
  // 首次登陆记录用户信息
  async markUserMsg(userInfoStr) {
    const res = await post("/weapp/markUserMsg", {
      userInfoStr
    });
    console.log(res)
  },
  //瀑布流用到的函数
  onReachBottom: function () {
    if (!this.data.noMore) {
      this.setData({
        pageNo: this.data.pageNo + 1
      })
      if(this.data.current==1){
      this.getArticalList(this.data.userInfo.openId, () => {
        this._doAppendMasonry(this.data.articals)
      })
    }else{
      this.getLikeArticalList(this.data.userInfo.openId, () => {
        this._doAppendMasonry(this.data.articals)
      })
    }
    }
  },

  _doRefreshMasonry(items) {
    this.masonryListComponent = this.selectComponent('#masonry');
    this.masonryListComponent.start(items).then(() => {
      console.log('refresh completed')
    })
  },

  _doAppendMasonry(items) {
    this.masonryListComponent = this.selectComponent('#masonry')
    // 获取接口数据后使用瀑布流组件append方法，当append完成后调用then，是否可触底价在的标志位可以在这里处理
    this.masonryListComponent.append(items).then(() => {
      console.log('refresh completed')
    })
  }
})