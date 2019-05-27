// components/userItem.js
let app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    msg: {
      type: Object,
      value: {}
    },
    index:{
      type: Number,
      value:0
    },
    type:{
      type:String,
      value:''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    openId:app.globalData.openId
  },
  // 2.3旧版生命周期
  attached() {
    this.setData({
      openId:app.globalData.openId
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    followChange(){
      this.triggerEvent('followChange',this.data.index)
    },
    goUserHome(){
      console.log(this.data.msg)
      wx.navigateTo({
        url: '/pages/userhome/userhome?openId='+this.data.msg.openId
      });
    }
  }
})
