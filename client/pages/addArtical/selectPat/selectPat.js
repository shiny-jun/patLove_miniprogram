// pages/addArtical/selectPat/selectPat.js
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
    selectArray: [],
    noPat: false,
    noMore: false,
    pageSize: 10,
    pageNo: 0, // 从0开始
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    wx.showNavigationBarLoading();
    this.getSwiperList()
    this.getselectedPat()
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
  // 企业本地获取已选中的宠物
  getselectedPat() {
    let selectPatStr = wx.getStorageSync('selectPat')
    if (selectPatStr) {
      let resArr = JSON.parse(selectPatStr)
      let selectArray = []
      resArr.forEach(item=>{
        selectArray.push(item.patId)
      })
      this.setData({
        selectArray
      })
    }
  },
  selectPat(e) {
    let patId = e.currentTarget.dataset.patid
    let selectArray = this.data.selectArray
    let index = selectArray.indexOf(patId)
    if (index != -1) {
      selectArray.splice(index, 1)
    } else {
      selectArray.push(patId)
    }
    console.log(selectArray)
    this.setData({
      selectArray
    })
  },

  submitPat() {
    let selectArray = this.data.selectArray
    if (selectArray) {
      let patList = this.data.patList
      let resArr = []
      patList.forEach(item => {
        if (selectArray.indexOf(item.patId) != -1) {
          let obj = {
            patId: item.patId,
            name: item.name,
            value: item.animalName
          }
          resArr.push(obj)
        }
      })
      let selectArrayStr = JSON.stringify(resArr)
      wx.setStorageSync('selectPat', selectArrayStr)
    }
    wx.navigateBack({
      delta: 1
    })
  },
  goCreatePat(e) {
    wx.navigateTo({
      url: '../../createPatData/createPatData',
    })

  }
})