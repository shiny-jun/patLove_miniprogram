import {
  get,post,showSuccess
} from "../../utils/index.js";
const regeneratorRuntime = require('../../utils/regenerator-runtime/runtime')
let app = getApp();

// pages/userhome/userhome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    current: 1,
    noMore: false,
    pageSize: 10,
    pageNo: 0, // 从0开始
    articals: [],
    minorUserInfo: {},
    follow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.openId)
    if (options.openId) {
      let openId = options.openId
      this.getUserInfo(openId,()=>{
        let userInfo = this.data.userInfo
      console.log(111)
      console.log(userInfo)
      wx.setNavigationBarTitle({
        title: userInfo.nickName
      })
      // 获取文章列表
      this.getArticalList(userInfo.openId, () => {
        this._doRefreshMasonry(this.data.articals)
      })
      this.getminorUserInfo(userInfo.openId)
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
//获取用户信息
  async getUserInfo(openId,fn) {
    let res = await get('/weapp/getUserList', {
      openId,
      myId:app.globalData.openId
    })
    let userInfo = res.list[0]
    this.setData({
      userInfo,
      follow:userInfo.follow
    })
    if(fn){
      fn()
    }
  },
  // 用于切换current
  changeCurrent(e) {
    let current = e.currentTarget.dataset.current
    this.setData({
      current
    })
    if (current == 1) {
      this.getArticalList(this.data.userInfo.openId, () => {
        this._doRefreshMasonry(this.data.articals)
      })
    } else {
      this.getLikeArticalList(this.data.userInfo.openId, () => {
        this._doRefreshMasonry(this.data.articals)
      })
    }
  },
  //关注、取关
  async followChange() {
    this.setData({
      follow: !this.data.follow
    })
    // console.log(this.data.like)
    let res = await post("/weapp/followChange", {
      follow: this.data.follow,
      openId: app.globalData.openId,
      following: this.data.userInfo.openId
    })
    if (res.data == 'ok') {
      if(this.data.follow){
        showSuccess('关注成功')
      } else {
        showSuccess('取关成功')
      }
    }
  },
  //获取文章列表
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
  //获取文章列表
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
  //瀑布流用到的函数
  onReachBottom: function () {
    if (!this.data.noMore) {
      this.setData({
        pageNo: this.data.pageNo + 1
      })
      if (this.data.current == 1) {
        this.getArticalList(this.data.userInfo.openId, () => {
          this._doAppendMasonry(this.data.articals)
        })
      } else {
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