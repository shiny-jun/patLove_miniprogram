// pages/home/home.js
import {
  get
} from "../../utils/index.js";
const regeneratorRuntime = require('../../utils/regenerator-runtime/runtime')
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [],
    articals: [],
    currentVal: '',
    count: null,
    noMore: false,
    pageSize: 10,
    pageNo: 0, // 从0开始
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.showNavigationBarLoading();
    // this.getToken()
    this.getSwiperList((res) => {
      this._doRefreshMasonry(res)
    })
  },
  //瀑布流用到的函数
  onReachBottom: function () {
    if (!this.data.noMore) {
      this.setData({
        pageNo: this.data.pageNo + 1
      })
      this.getArticalList((res) => {
        this._doAppendMasonry(res)
      })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      pageNo:0,
      noMore:false
    })
    wx.showNavigationBarLoading();
    // this.getToken()
    this.getArticalList((res) => {
      this._doRefreshMasonry(res)
    })
    wx.stopPullDownRefresh();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // async getToken() {
  //   const token = await get("/weapp/qiniu", {});
  //   console.log('token', token)
  //   wx.setStorageSync('token', token)
  // },
  // 获取types列表的数据
  async getSwiperList(fn) {
    console.log(1)
    const types = await get("/weapp/swiperlist", {});
    this.setData({
      types: types.list,
      currentVal: types.list[0].value,
    })
    this.getArticalList(fn)
    wx.hideNavigationBarLoading();
  },
  addArticalPage() {
    wx.navigateTo({
      url: '/pages/addArtical/addArtical',
    })
  },
  currentChange(e) {
    let currentVal = e.detail
    this.setData({
      currentVal,
      pageNo: 0
    })
    console.log(currentVal)
    this.getArticalList((res) => {
      this._doRefreshMasonry(res)
    })
  },
  //获取文章列表
  async getArticalList(fn) {
    console.log(2)
    let params = {}
    if (this.data.currentVal == 'follow') {
      if (app.globalData.openId) {
        params = {
          value: this.data.currentVal,
          openId: app.globalData.openId
        }
      } else {
        this.setData({
          artical: []
        })
        return
      }
    } else {
      params = {
        value: this.data.currentVal,
      }
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
})