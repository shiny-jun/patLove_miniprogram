// pages/home/home.js
import {
  get
} from "../../utils/index.js";
const regeneratorRuntime = require('../../utils/regenerator-runtime/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [],
    currentVal: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    this.getSwiperList()
    let userInfoStr = wx.getStorageSync('userInfo')
    if (userInfoStr) {
      let userInfo = JSON.parse(userInfoStr)
      this.setData({
        userInfo: userInfo,
      })
    }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 获取types列表的数据
  async getSwiperList() {
    console.log(1)
    const types = await get("/weapp/swiperlist", {});
    console.log(types)
    this.setData({
      types: types.list,
      currentVal: types.list[0].value
    })
    this.getArticalList()
    wx.hideNavigationBarLoading();
  },
  addArticalPage() {
    wx.navigateTo({
      url: '/pages/addArtical/addArtical',
    })
  },
  currentChange(e){
    let currentVal = e.detail
    this.setData({
      currentVal
    })
    this.getArticalList()
  },
  //获取文章列表
  async getArticalList() {
    console.log(2)
    let params = {}
    if (this.data.currentVal == 'follow') {
      if (this.data.userInfo.openId) {
        params = {
          value: this.data.currentVal,
          openId: this.data.userInfo.openId
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
    const artical = await get("/weapp/articalList", 
      params
    );
    console.log(artical)
    this.setData({
      artical: artical.list
    })
    wx.hideNavigationBarLoading();
  },
})