var patTypes = ['猫猫',"狗狗","蛇蛇","兔兔"]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      name:'',
      type:'',
      sex:'',
      brithday:'',
      weight:'',
      isUnBrith:'',
      signText:'',
    }
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

  dateChange(e){
    var date = e.detail.value
    this.data.form.brithday = date;
    this.setData({
      form: this.data.form
    })
  },

  dataChoose(e) {
    let type = e.currentTarget.dataset.type
    let key = e.currentTarget.dataset.key
    this.data.form[type] = key
    this.setData({
      form: this.data.form
    })
  },

  dataInput(e){
    let word = e.detail.value;
    let type = e.currentTarget.dataset.type
    this.data.form[type] = word
    this.setData({
      form: this.data.form
    })
  },

  patSelect(){
    wx.showActionSheet({
      itemList: patTypes,
      success:res => {
        this.data.form.type = patTypes[res.tapIndex]
        this.setData({
          form: this.data.form
        })
      }
    })
  },
})