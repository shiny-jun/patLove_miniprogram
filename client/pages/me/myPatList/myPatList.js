// client/pages/me/myPatList/myPatList.js
import {
  get
} from "../../../utils/index.js";
const regeneratorRuntime = require('../../../utils/regenerator-runtime/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    patList: [],
    noPat: false,
    noMore: false,
    pageSize: 10,
    pageNo: 0, // 从0开始
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    this.getSwiperList()
  },

  async getSwiperList() {
    let userInfoStr = wx.getStorageSync('userInfo')
    if (userInfoStr) {
      let userInfo = JSON.parse(userInfoStr)
      let openId = userInfo.openId
      let params = {
        openId,
        pageSize: this.data.pageSize,
        pageNo: this.data.pageNo
      }
      const patList = await get("/weapp/myPatList", params);
      console.log(patList)
      if (patList.list) {
        this.setData({
          patList: patList.list,
        })
      } else {
        this.setData({
          noPat: true
        })

      }
      wx.hideNavigationBarLoading();
    }
  }

})