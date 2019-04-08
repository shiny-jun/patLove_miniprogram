// components/newsItem/newsItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{}
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
    _avaterClick(){
      this.triggerEvent("avaterClick",this.data.item);
    },
    _itemClick() {
      this.triggerEvent("itemClick", this.data.item);
    },
    _reAttention() {
      this.triggerEvent("reAttention", this.data.item);
    }

  }
})
