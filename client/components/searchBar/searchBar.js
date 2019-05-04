// components/searchBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    canuse: {
      type: Boolean,
      value: false
    },
    val: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inpVal: ''
  },

  /**
   * 组件的方法列表
   */
  pageLifetimes: {
    show() {
      // 在组件实例进入页面节点树时执行
      console.log(this.data.val)
      if (this.data.val) {
        console.log(this.data.val)
        this.setData({
          inpVal: this.data.val
        })
      }
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  methods: {
    goSearchPage() {
      if (this.data.inpVal) {
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
          success: function (res) {
            // success
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })
      } else {
        wx.navigateTo({
          //前往搜索页
          url: "/pages/searchPage/searchPage"
        });
      }
    },
    goback() {
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
        success: function (res) {
          // success
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    },
    handleInput(val) {
      this.triggerEvent("handleInput", val.detail.value);
    },
    // 清空按钮
    clearVal(e) {
      this.setData({
        inpVal: ''
      })
    },
    valChange(e) {
      let val = e.detail.value;
      console.log(val)
      this.setData({
        inpVal: val
      })
    },
    //pc测试用
    searchhandleInput() {
      console.log(this.data.val)
      this.triggerEvent("handleInput", this.data.inpVal);
    }
  }
})