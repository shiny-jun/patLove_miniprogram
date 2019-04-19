// client/pages/me/myPatList/myPatList.js
import {
  get
} from "../../../utils/index.js";
const regeneratorRuntime = require('../../../utils/regenerator-runtime/runtime')
let app = getApp();

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
  onShow: function (options) {
    wx.showNavigationBarLoading();
    this.getSwiperList()
  },
// 获取宠物列表

  async getSwiperList() {
    if (app.globalData.openId) {
      let openId = app.globalData.openId
      let params = {
        openId,
        pageSize: this.data.pageSize,
        pageNo: this.data.pageNo
      }
      const patList = await get("/weapp/myPatList", params);
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
  },
  goCreatePat(e){
    let id = e.currentTarget.dataset.patid
    console.log(id)
    if(id){
      wx.navigateTo({
        url: '../../createPatData/createPatData?id='+id,
      })
    }else{
      wx.navigateTo({
        url: '../../createPatData/createPatData',
      })
    }
  }
})