// components/current/current.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    types: Object
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
    changeCurrentTab(index) {
      this.currentTab = index
    },
    bindchangeCurrent(e) {
      console.log(e.detail.current)
      this.currentTab = e.detail.current
    },
  }
})