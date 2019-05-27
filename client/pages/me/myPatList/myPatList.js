// client/pages/me/myPatList/myPatList.js
import {
  get, getDate
} from "../../../utils/index.js";
const regeneratorRuntime = require('../../../utils/regenerator-runtime/runtime')
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    patList: [],
    noMore: false,
    pageSize: 10,
    pageNo: 0, // 从0开始
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    wx.showNavigationBarLoading();
    this.setData({pageNo:0})
    this.getPatList((res)=>{
      this.setData({
        patList: res,
      })
    })
  },

  // 上拉加載
  onReachBottom: function () {
    this.setData({
      pageNo:this.data.pageNo+1
    })
    this.getPatList((res) => {
      let patList = this.data.patList
      patList.concat(res)
      this.setData({
        patList
      })
    })
  },

// 获取宠物列表

  async getPatList(fn) {
    if (app.globalData.openId) {
      let openId = app.globalData.openId
      let params = {
        openId,
        pageSize: this.data.pageSize,
        pageNo: this.data.pageNo
      }
      const patList = await get("/weapp/myPatList", params);
      if(patList.list){
        if(patList.list.length<this.data.pageSize){
          this.setData({noMore:true})
        }
        if(fn){
          patList.list.forEach(item => {
            item.birthday = getDate(item.birthday)
          });
        fn(patList.list)
      }
      }
      
      wx.hideNavigationBarLoading();
    }
  },
  goCreatePat(e){
    let id = e.currentTarget.dataset.patid
    console.log(id)
    if(id){
      wx.navigateTo({
        url: '../../patDetail/patDetail?id='+id,
      })
    }else{
      wx.navigateTo({
        url: '../../createPatData/createPatData',
      })
    }
  }
})