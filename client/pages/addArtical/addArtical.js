// import {
//   uploadFile
// } from '../../utils/qiniuUpImage'
import {
  get
} from "../../utils/index.js";
const regeneratorRuntime = require('../../utils/regenerator-runtime/runtime')
import qiniuUploader from '../../utils/qiniuUploader'
// pages/addArtical/addArtical.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getToken()
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  getImage(e) {
    let _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0];
        let imageList = _this.data.imageList
        

      }
    })
  },

  // 删除照片
  delImage(e) {
    let _this = this
    wx.showActionSheet({
      itemList: ['删除'],
      success(res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          let index = e.currentTarget.dataset.index
          let imageList = _this.data.imageList
          imageList.splice(index, 1)
          _this.setData({
            imageList
          })
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  // 获取types列表的数据
  async getToken() {
    const token = await get("/weapp/qiniu", {});
    console.log('token', token)
  },
})