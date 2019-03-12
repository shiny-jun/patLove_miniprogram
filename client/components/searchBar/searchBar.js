// components/searchBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    canuse:{
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inpVal: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goSearchPage() {
      wx.navigateTo({
        //前往搜索页
        url: "/pages/searchPage/searchPage"
      });
    },
    handleInput(val) {
      this.triggerEvent("handleInput", val.target.value);
    },
    linkInput(val){
      this.setData({
        inpVal: val.target.value
      })
    }
  }
})
