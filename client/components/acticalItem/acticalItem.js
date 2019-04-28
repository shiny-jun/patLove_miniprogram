// components/acticalItem/acticalItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:Object
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
    goDetail(e){
      let articalId = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/articalDetail/articalDetail?articalId=' + articalId,
      })
    }
  }
})
