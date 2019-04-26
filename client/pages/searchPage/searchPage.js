// pages/searchPage/searchPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historys: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.getHistorys()
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

  },
  handleInput(val) {
    let value = val.detail
    if(value)
    if (value) {
      // 历史记录保存
      let historystr = wx.getStorageSync('historys')
      let res = ''
      if (historystr) {
        let historys = JSON.parse(historystr)
        historys.unshift(value)
        if (historys.length > 20) {
          historys.slice(0, 20)
        }
        res = JSON.stringify(historys)
      } else {
        let historys = []
        historys.unshift(value)
        res = JSON.stringify(historys)
      }
      wx.setStorageSync('historys', res)
      // 跳转
      wx.navigateTo({
        url: '/pages/articalList/articalList?value='+value,
        success: function(res){
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    }
  },
  getHistorys() {
    let historystr = wx.getStorageSync('historys')
    if (historystr) {
      let historys = JSON.parse(historystr)
      this.setData({
        historys
      })
    }
  }
})