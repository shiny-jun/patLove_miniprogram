// pages/userList/userList.js
import {
  get,post,showSuccess,showToast
} from "../../utils/index.js";
const regeneratorRuntime = require('../../utils/regenerator-runtime/runtime')
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList:[],
    type:'',
    pageSize:10,
    pageNo:0,
    noMore:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type
    if(type=="following"){
      wx.setNavigationBarTitle({
        title: '关注'
      })
    }else if(type=='fans'){
      wx.setNavigationBarTitle({
        title: '粉丝'
      })
    }
    this.setData({
      type,
      openId:options.openId
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
    // 获取用户列表
    this.getUserList((res) => {
      this.setData({
        userList: res
      })
    })
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
    this.setData({
      pageNo:this.data.pageNo+1
    })
    this.getUserList((res) => {
      let userList = this.data.userList
      userList.concat(res)
      this.setData({
        userList
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //获取用户列表
  async getUserList(fn) {
    wx.showNavigationBarLoading();
    let params = {}
    console.log(this.data.type)
    params.type = this.data.type,
    params.pageSize = this.data.pageSize
    params.pageNo = this.data.pageNo
    params.myId = this.data.openId
    const userInfo = await get("/weapp/getUserList",
      params
    );
    console.log(userInfo)
    if (userInfo.length < this.data.pageSize) {
      this.setData({
        noMore: true
      })
    }
    // this.setData({
    //   userInfo: userInfo.list
    // })
    if (fn) {
      fn(userInfo.list)
    }
    wx.hideNavigationBarLoading();
  },
  //关注用户
  async followChange(e){
    if(!app.globalData.openId){
      showToast('请先授权')  
      return
  }
    let index = e.detail
    let userList = this.data.userList
    userList[index].follow=!userList[index].follow
    this.setData({
      userList
    })
    // console.log(this.data.like)
    let res = await post("/weapp/followChange", {
      follow: userList[index].follow,
      openId: app.globalData.openId,
      following: userList[index].openId
    })
    if (res.data == 'ok') {
      if(this.data.follow){
        showSuccess('关注成功')
      } else {
        showSuccess('取关成功')
      }
    }
  }
})