// pages/articalList/articalList.js
import {
  get,post,showSuccess, showToast
} from "../../utils/index.js";
const regeneratorRuntime = require('../../utils/regenerator-runtime/runtime')
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    val: '',
    current: 1,
    noMore: false,
    userList: [],// 用户列表
    pageSize: 10,
    pageNo: 0, // 从0开始
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let val = options.value
    this.setData({
      val
    })
    wx.setNavigationBarTitle({
      title: val
    })
    this.getArticalList((res) => {
      this._doRefreshMasonry(res)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.noMore) {
      this.setData({
        pageNo: this.data.pageNo + 1
      })
      if (this.data.current == 1) {
        this.getArticalList((res) => {
          this._doAppendMasonry(res)
        })
      } else {
        this.getUserList((res) => {
          let userList = this.data.userList
          userList.concat(res)
          this.setData({
            userList
          })
        })
      }

    }
  },
  // 用于切换current
  changeCurrent(e) {
    let current = e.currentTarget.dataset.current
    if (current !== this.data.current) {
      this.setData({
        current,
        pageNo : 0
      })
      if (current == 1) {
        this.getArticalList((res) => {
          this._doRefreshMasonry(res)
        })
      } else {
        this.getUserList((res) => {
          this.setData({
            userList: res
          })
        })
      }
    }

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  async getArticalList(fn) {
    console.log(2)
    wx.showNavigationBarLoading();
    let params = {}
    params = {
      search: this.data.val,
    }

    params.pageSize = this.data.pageSize
    params.pageNo = this.data.pageNo
    const articals = await get("/weapp/articalList",
      params
    );
    console.log(articals)
    if (articals.length < this.data.pageSize) {
      this.setData({
        noMore: true
      })
    }
    // this.setData({
    //   articals: articals.list
    // })
    if (fn) {
      fn(articals.list)
    }
    wx.hideNavigationBarLoading();
  },
  //获取用户列表
  async getUserList(fn) {
    wx.showNavigationBarLoading();
    let params = {}
    params.search = this.data.val,
    params.pageSize = this.data.pageSize
    params.pageNo = this.data.pageNo
    params.myId = app.globalData.openId
    const userInfo = await get("/weapp/getUserList",params);
    if (userInfo.length < this.data.pageSize) {
      this.setData({
        noMore: true
      })
    }
    if (fn) {
      fn(userInfo.list)
    }
    wx.hideNavigationBarLoading();
  },
  //关注用户
  async followChange(e){
    if(!app.globalData.openId){
        showToast('请先授权')  
        return
    }
    let index = e.detail
    let userList = this.data.userList
    userList[index].follow=!userList[index].follow
    this.setData({
      userList
    })
    // console.log(this.data.like)
    let res = await post("/weapp/followChange", {
      follow: userList[index].follow,
      openId: app.globalData.openId,
      following: userList[index].openId
    })
    if (res.data == 'ok') {
      if(this.data.follow){
        showSuccess('关注成功')
      } else {
        showSuccess('取关成功')
      }
    }
  }
})