// pages/msg/msg.js
import util from "../../utils/util";

let img = 'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=e90f5c043bd12f2eda08a6322eabbe07/9358d109b3de9c8243bbc45c6181800a18d84302.jpg'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList:[
      {
        avatar: img,
        type:'ZAN',
        place:'帖子',
        otherUserName:'你老公',
        img,
        comment:'',
        time:'2019-04-08 11:01:27'
      },
      {
        avatar: img,
        type:'ATTENTION',
        place:'帖子',
        otherUserName:'你老公',
        img:"",
        comment:'',
        time:'2019-03-13 17:01:27'
      },
      {
        avatar: img,
        type:'COMMENT',
        place:'帖子',
        otherUserName:'你老公',
        img,
        comment: '爱你哟我的bb君',
        time: '2019-03-13 17:01:27'
      },
      {
        avatar: img,
        type:'ZAN',
        place:'个人页面',
        otherUserName:'蔡徐坤',
        img,
        comment: '',
        time: '2019-03-13 17:01:27'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new util(this);
    this.newsItem = this.selectComponent("#newsItem");
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

  avaterClick(){
    this.showToast('点击头部')
  },

  itemClick() {
    this.showToast('点击一整条')
    },

  reAttention(){
    this.showToast('点击回粉')
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

  }
})