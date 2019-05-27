// pages/msg/msg.js
import util from "../../utils/util";
import {
  get,
  post,
  showSuccess,
  getTime,
  showToast
} from "../../utils/index.js";
const regeneratorRuntime = require('../../utils/regenerator-runtime/runtime')
let app = getApp();

let img = 'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=e90f5c043bd12f2eda08a6322eabbe07/9358d109b3de9c8243bbc45c6181800a18d84302.jpg'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList: [],
    noMore: false,
    pageSize: 10,
    pageNo: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new util(this);
    this.newsItem = this.selectComponent("#newsItem");
    this.getnewsList((res)=>{
      this.setData({
        newsList:res
      })
    })
  },

  avaterClick(e) {
    // this.showToast('点击头部')
    let openId = e.detail.userInfo.openId
    wx.navigateTo({
      url: '/pages/userhome/userhome?openId=' + openId
    });
  },

  itemClick(e) {
    // this.showToast('点击一整条')
    let openId = e.detail.userInfo.openId
    wx.navigateTo({
      url: '/pages/userhome/userhome?openId=' + openId
    });
  },

  reAttention() {
    // this.showToast('点击回粉')
    this.showToast('功能未完善')
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
    this.getnewsList((res) => {
      let newsList = this.data.newsList
      newsList.concat(res)
      this.setData({
        newsList
      })
    })
  },

  goMsgList(e){
    let type=e.currentTarget.dataset.type
    wx.navigateTo({
      url:'/pages/msg/msgList/msgList?type='+type
    })
  },
  async getnewsList(fn) {
    let res = await get('/weapp/msgList', {
      openId: app.globalData.openId,
      type: 'follow',
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize
    })
    let newlist = res.list
    console.log(res)
    newlist.forEach(item => {
      item.createdtime = getTime(item.createdtime)
    });
    if(fn){
      fn(newlist)
    }
  }
})