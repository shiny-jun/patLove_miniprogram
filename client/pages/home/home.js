// pages/home/home.js
import { get } from "../../utils/index.js";
const regeneratorRuntime = require('../../utils/regenerator-runtime/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [
      { name: "推荐", value: "recommend" },
      { name: "关注", value: "follow" },
      { name: "狗", value: "dog" },
      { name: "猫", value: "cat" },
      { name: "兔", value: "rabbit" },
      { name: "鼠", value: "rat" },
      { name: "鱼", value: "fish" },
      { name: "其他", value: "other" },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    this.getSwiperList()
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
  async getSwiperList(){
    const types = await get("/weapp/swiperlist", {});
    console.log(types)
    this.setData({
      types:types.list
    })
    wx.hideNavigationBarLoading();
  }

})