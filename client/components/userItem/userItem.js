// components/userItem.js
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    followChange(){
      this.triggerEvent('followChange',this.data.index)
    },
    goUserHome(){
      wx.navigateTo({
        url: '/pages/userhome/userhome?openId='+this.data.msg.openId
      });
    }
  }
})
