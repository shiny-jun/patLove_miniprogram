// pages/userDataEdit/userDataEdit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexArray: [ '未知', '男','女', ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let userInfoStr = wx.getStorageSync('userInfo')
    if (!userInfoStr) {
      wx.showModal({
        title: '数据错误',
        content: '请稍后重试',
        success: res => {
          if (res.confirm) {
            wx.navigateBack()
          }
        }
      })
      return
    }
    if (userInfoStr) {
      let userInfo = JSON.parse(userInfoStr)
      this.setData({
        userInfo: userInfo,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  pickChange(e){
    let key = e.currentTarget.dataset.type
    this.data.userInfo[key] = e.detail.value
    this.setData({
      userInfo: this.data.userInfo
    })
  },
})