// components/patItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemMsg: Object
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
    goPatDetail(){
      wx.navigateTo({
        url: '/pages/patType/patDetail/patDetail?typeId=' + this.data.itemMsg.typeId,
      })
      
    }
  }
})
