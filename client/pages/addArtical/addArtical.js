import {
  initQiniu
} from '../../utils/qiniuUpImage'
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
  onLoad: function (options) {

  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  getImage(e) {
    initQiniu()
    let _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        // let imageList = _this.data.imageList
        // imageList.push(tempFilePaths)
        // console.log(imageList)
        // _this.setData({
        //   imageList
        // })
        qiniuUploader.upload(filePath, (res) => {
          that.setData({
            'imageObject': res
          });
        }, (error) => {
          console.error('error: ' + JSON.stringify(error));
        },
        null,// 可以使用上述参数，或者使用 null 作为参数占位符
        (progress) => {
          console.log('上传进度', progress.progress)
            console.log('已经上传的数据长度', progress.totalBytesSent)
            console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)
        }, cancelTask => that.setData({cancelTask})
        );

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
  }
})