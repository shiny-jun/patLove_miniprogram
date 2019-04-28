// pages/articalDetail/articalDetail.js
import {
  get
} from "../../utils/index.js";
const regeneratorRuntime = require('../../utils/regenerator-runtime/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articalId: null,
    articalDetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.articalId) {
      let articalId = options.articalId
      this.setData({
        articalId
      })
      this.getArticalList()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  async getArticalList() {
    let articalId = this.data.articalId
    const articals = await get("/weapp/articalList", {
      articalId
    });
    let articalDetail = articals.list[0]
    this.setData({
      articalDetail
    })
  }
})