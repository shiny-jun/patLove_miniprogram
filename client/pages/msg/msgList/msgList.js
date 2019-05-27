// pages/msg/msgList/msgList.js
import {
  get,
  post,
  showSuccess,
  getTime,
  showToast
} from "../../../utils/index.js";
const regeneratorRuntime = require('../../../utils/regenerator-runtime/runtime')
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList:[],
    type:'',
    noMore:false,
    pageNo:0,
    pageSize:10
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type){
      let type = options.type
      this.setData({
        type
      })
      if(type=="comment"){
        wx.setNavigationBarTitle({
          title: '评论'
        })
      }else if(type=='like'){
        wx.setNavigationBarTitle({
          title: '点赞'
        })
      }
      this.getnewsList((res)=>{
        this.setData({
          newsList:res
        })
      })
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      pageNo:0,
      noMore:false
    })
    this.getnewsList((res)=>{
      this.setData({
        newsList:res
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pageNo:this.data.pageNo+1
    })
    this.getnewsList((res) => {
      let newsList = this.data.newsList
      newsList.concat(res)
      this.setData({
        newsList
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  async getnewsList(fn) {
    let res = await get('/weapp/msgList', {
      openId: app.globalData.openId,
      type: this.data.type,
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize
    })
    let newlist = res.list
    console.log(res)
    newlist.forEach(item => {
      item.createdtime = getTime(item.createdtime)
    });
    if(newlist.length<this.data.pageSize){
      this.setData({
        noMore:true
      })
    }
    if(fn){
      fn(newlist)
    }
  },
  // 点击消息
  itemClick(e){
    let articalId
    if(this.data.type=='comment'){
      articalId=e.detail.commentMsg.articalId
    } else {
      articalId = e.detail.likeMsg.articalId
    }
    wx.navigateTo({
      url: '/pages/articalDetail/articalDetail?articalId='+articalId
    });
  },
  // 点击头像
  avaterClick(e){
    console.log(e)
    let openId=e.detail.openId
    wx.navigateTo({
      url: '/pages/userhome/userhome?openId='+openId
    });
  }
})