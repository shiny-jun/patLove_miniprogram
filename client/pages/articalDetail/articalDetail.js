// pages/articalDetail/articalDetail.js
import {
  get,
  post,
  showSuccess
} from "../../utils/index.js";
let app = getApp();
const regeneratorRuntime = require('../../utils/regenerator-runtime/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articalId: null,
    articalDetail: {},
    openId:app.globalData.openId,
    //所有图片的高度  
    imgheights: [],
    //图片宽度 
    imgwidth: 750,
    //默认  
    current: 0,
    commentlist: [],
    like: false,
    follow: false,
    noMore: false,
    pageSize: 10,
    pageNo: 0, // 从0开始
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.articalId) {
      let articalId = options.articalId
      this.setData({
        articalId
      })
      // this.getArticalList()
      // this.setData({
      //   Page: 0,
      //   noMore: false
      // })
      // this.getCommentList(res => {
      //   this.setData({
      //     commentlist: res
      //   })
      // })
    }
  },
  onShow(){
    if(this.data.articalId){
      this.getArticalList()
      this.setData({
        Page: 0,
        noMore: false
      })
      this.getCommentList(res => {
        this.setData({
          commentlist: res
        })
      })
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onShow()
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

  },
  getMore(){
    let _this = this
    wx.showActionSheet({
      itemList: ['编辑','删除'],
      success(res) {
        console.log(res.tapIndex)
        if(res.tapIndex == 0){
          wx.navigateTo({
            url:'/pages/addArtical/addArtical?articalId='+_this.data.articalId
          })
        }
        else if (res.tapIndex == 1) {
          wx.showModal({
            title: '提示',
            content: '确认删除这篇文章？',
            success(res) {
              if (res.confirm) {
                // console.log('用户点击确定')
                this.delete(_this.data.articalId)
              } else if (res.cancel) {
                // console.log('用户点击取消')
              }
            }
          })
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  goUserhome(){
    wx.navigateTo({
      url: '/pages/userhome/userhome?openId='+this.data.articalDetail.userInfo.openId
    });
  },
  // 删除笔记
  async delete(articalId){
    const res = await post("/weapp/delete", {
      articalId
    });
    if (res.data == 'ok') {
      showSuccess('删除成功')
      setTimeout(() => {
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
        })
      }, 2000)
    } 
  },
  async getArticalList() {
    wx.showNavigationBarLoading();
    let articalId = this.data.articalId
    let openId = app.globalData.openId
    const articals = await get("/weapp/articalList", {
      articalId,
      openId
    });
    let articalDetail = articals.list[0]
    this.setData({
      articalDetail,
      like: articalDetail.like ? true : false,
      follow:articalDetail.follow
    })
    wx.hideNavigationBarLoading();
  },
  async getCommentList() {
    wx.showNavigationBarLoading();
    let articalId = this.data.articalId
    let pageNo = this.data.pageNo
    let pageSize = this.data.pageSize
    let params = {
      pageNo,
      articalId,
      pageSize
    }
    const commentlistRes = await get("/weapp/commentList", params);
    let noMore = false
    if (commentlistRes.list.length < this.data.pageSize) {
      noMore = true
    }
    this.setData({
      commentlist: commentlistRes.list,
      noMore,
    })
    wx.hideNavigationBarLoading();
  },
  // 跑马灯用于计算高度
  imageLoad: function (e) { //获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    console.log(imgwidth, imgheight)
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights;
    //把每一张图片的对应的高度记录到数组里  
    imgheights[e.target.dataset.id] = imgheight;
    this.setData({
      imgheights: imgheights
    })
  },
  bindchange: function (e) {
    // console.log(e.detail.current)
    this.setData({
      current: e.detail.current
    })
  },
  //提交评论
  async formSubmit(e) {
    let content = e.detail.value.comment
    let form = {
      openId: app.globalData.openId,
      articalId: this.data.articalId,
      content
    }
    let formStr = JSON.stringify(form)
    let res = await post("/weapp/addComment", {
      formStr
    });
    if (res.data == 'ok') {
      showSuccess('发布成功')
      this.getCommentList(res => {
        this.setData({
          commentlist: res
        })
      })
    }
  },
  async likeChange() {
    this.setData({
      like: !this.data.like
    })
    let articalDetail = this.data.articalDetail
    if (this.data.like) {
      articalDetail.likeCount = articalDetail.likeCount + 1
    } else {
      articalDetail.likeCount = articalDetail.likeCount - 1
    }
    this.setData({
      articalDetail
    })
    console.log(this.data.like)
    let res = await post("/weapp/likeChange", {
      like: this.data.like,
      openId: app.globalData.openId,
      articalId: this.data.articalId
    })
  },
  async followChange() {
    this.setData({
      follow: !this.data.follow
    })
    // console.log(this.data.like)
    let res = await post("/weapp/followChange", {
      follow: this.data.follow,
      openId: app.globalData.openId,
      following: this.data.articalDetail.userInfo.openId
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