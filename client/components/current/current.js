// components/current/current.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    types: Object
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的初始数据
   */
  data: {
    currentTab: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeCurrentTab(e) {
      this.setData({
        currentTab : e.currentTarget.dataset.index
      })
    },
    bindchangeCurrent(e) {
      console.log(e.detail.current)
      this.setData({
        currentTab : e.detail.current
      })
    },
  }
})