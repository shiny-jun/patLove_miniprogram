// components/myPatItem/myPatItem.js
const {
  watch,
  computed
} = require('../../utils/vuefy.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    patItem: Object,
    select: Boolean,
    selectArray: Array
  },

  ready() {
    computed(this, {
      selected: function() {
        console.log('computed')
        return this.data.selectArray.indexOf(this.data.patItem.patId) == -1
      },
    })
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
    // selectId(id) {
    //   return selectArray.indexOf(id) == -1
    // },

  }
})