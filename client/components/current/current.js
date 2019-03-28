// components/current/current.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    types: Array
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的初始数据
   */
  data: {
    currentValue: 'recommend'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeCurrentTab(e) {
      this.setData({
        currentValue : e.currentTarget.dataset.val
      })
      this.triggerEvent('currentChange',e.currentTarget.dataset.val)
    },
  }
})