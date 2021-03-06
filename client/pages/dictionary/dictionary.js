// pages/dictionary/dictionary.js
import {
  get
} from "../../utils/index.js";
const regeneratorRuntime = require('../../utils/regenerator-runtime/runtime')
const colors = ['#ceacd1', '#e78bb4', '#f0c5b5', '#e9d0a7', '#eada8f', '#b1d6b4', '#7fc9bc', '#7ec4dd', '#8aa1ca']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [],
    colors: colors
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    this.getAnimalList()
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
  async getAnimalList() {
    const types = await get("/weapp/animallist", {});
    console.log(types)
    let list = types.list
    list.forEach((item, index) => {
      item.color = colors[index % colors.length]
    })
    this.setData({
      types: list
    })
    wx.hideNavigationBarLoading();
  },
  // 通向pattype页
  gopattype(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      //前往搜索页
      url: "/pages/patType/patType?animalId=" + id
    });
  }
})