// pages/patDetail/patDetail.js
import {
  get,
  post,
  showSuccess,
  showToast,
  getDate,
} from "../../utils/index.js";
const qiniuUploader = require("../../utils/qiniuUploader");
const regeneratorRuntime = require('../../utils/regenerator-runtime/runtime')
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    patId:'',
    form: {
      name: '',
      animalName: '',
      sex: null,
      birthday: '',
      weight: null,
      isUnbrith: null,
      character: '',
    },
    animallist: [],
    pattypeIndex: null,
    itemList: [],
    headImg: '',
    userInfo: null,
    myOpenId: app.globalData.openId
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAnimalList()
    let patId = options.id
    this.setData({
      patId
    })
    // this.getUserInfo()
    // console.log(app.globalData.openId)
  },
  onShow(){
    this.getPatDetail(this.data.patId)
  },

  // getUserInfo(){
  //   let userInfoStr = wx.getStorageSync('userInfo')
  //   if (userInfoStr) {
  //     let userInfo = JSON.parse(userInfoStr)
  //     this.setData({
  //       userInfo: userInfo
  //     })
  //   }
  // },
  // 获取types列表的数据
  async getAnimalList() {
    const animallist = await get("/weapp/animallist", {});
    let itemList = []
    animallist.list.forEach(item => {
      itemList.push(item.animalName)
    })
    this.setData({
      animallist: animallist.list,
      itemList: itemList
    })
    wx.hideNavigationBarLoading();
  },
  //获取宠物信息
  async getPatDetail(patId) {
    const detail = await get("/weapp/myPatList", {
      patId
    });
    let form = detail.list[0]
    form.birthday = getDate(form.birthday)
    let pattypeIndex = 0
    let animallist = this.data.animallist
    animallist.forEach((item, index) => {
      if (item.animalName == form.animalName) {
        pattypeIndex = index
      }
    })
    this.setData({
      form,
      pattypeIndex,
      headImg: form.headImg
    })
  },
  
  goEdit(){
    wx.navigateTo({
      url: '../createPatData/createPatData?id='+this.data.patId,
    })
  }
})