// import {
//   uploadFile
// } from '../../utils/qiniuUpImage'
import {
  get,
  post,
  showSuccess,
  showToast
} from "../../utils/index.js";
const regeneratorRuntime = require('../../utils/regenerator-runtime/runtime')
import qiniuUploader from '../../utils/qiniuUploader'
let app = getApp();
// pages/addArtical/addArtical.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    patList: [],
    location: '',
    articalId: '',
    form: {
      title: '',
      content: '',
      imageList: [],
      patList: [],
      location: '',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.articalId) {
      let articalId = options.articalId
      this.setData({
        articalId
      })
      this.getArtical(articalId)
    }
    this.getToken()
  },
  onShow() {
    this.getselectPatList()
  },
  // 获取已选择的宠物列表
  getselectPatList() {
    let patListStr = wx.getStorageSync('selectPat')
    if (patListStr) {
      let patArr = JSON.parse(patListStr)
      this.setData({
        patList: patArr
      })
    }
  },
  getImage(e) {
    let _this = this
    let token = wx.getStorageSync('token')
    if (!token) {
      this.getToken()
      token = wx.getStorageSync('token')
    }
    wx.chooseImage({
      count: (9-this.data.imageList.length), // 最多9张
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        let imageList = _this.data.imageList
        let wechatma = [];
        let tempFilePaths = res.tempFilePaths;
        //七牛提供的上传方法
        console.log(tempFilePaths)
        tempFilePaths.forEach((item, index) => {
          qiniuUploader.upload(item, (res) => {
            let imageList = _this.data.imageList
            imageList.push(res.imageURL)
            _this.setData({
              imageList
            });
          }, (error) => {
            console.log('error: ' + error);
          }, {
            region: 'ECN',
            domain: 'http://prfo1ihvv.bkt.clouddn.com',
            uptoken: token, // 由其他程序生成七牛 uptoken
          });

        })
      }
    })
  },
  // 获取token
  async getToken() {
    const token = await get("/weapp/qiniu", {});
    wx.setStorageSync('token', token)
  },
  // 前往选择宠物
  goSelectPat() {
    wx.navigateTo({
      url: 'selectPat/selectPat',
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
  //选择区域
  selectlocation() {
    if (this.data.location) {
      this.setData({
        location: ''
      })
    } else {
      this.getGeo()
    }
  },
  // 获取地址授权
  getGeo(e) {
    // qG4loFFdoTinNKFLfT8YcTL7fvF7szUG
    const ak = "qG4loFFdoTinNKFLfT8YcTL7fvF7szUG";
    let url = "http://api.map.baidu.com/geocoder/v2/";
    let _this = this
    wx.getLocation({
      type: "wgs84", //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标,
      success: res => {
        console.info("getLocation success: ", res);
        wx.request({
          url, //开发者服务器接口地址",
          data: {
            location: `${res.latitude},${res.longitude}`,
            output: "json",
            ak
          }, //请求的参数",
          // method: 'GET',
          // dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
          success: res => {
            console.log(res);
            if (res.data.status == 0) {
              // this.location = res.data.result.addressComponent.city;
              _this.setData({
                location: res.data.result.addressComponent.city
              })
            } else {
              // this.location = "位置地点";
              _this.setData({
                location: ''
              })
            }
          },
        });
      },
      fail: () => {
        console.log("getLocation failed");
      }
    });
  },
  async formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let form = e.detail.value
    if (!form.title) {
      showToast('请输入笔记标题！')
    } else if (!form.content) {
      showToast('请输入笔记内容！')
    } else {
      form.imageList = this.data.imageList
      form.patList = this.data.patList
      form.location = this.data.location
      form.openId = app.globalData.openId
      form.articalId = this.data.articalId
      let formStr = JSON.stringify(form)
      const res = await post("/weapp/addArtical", {
        formStr
      });
      if (res.data == 'ok') {
        showSuccess('发布成功')
        setTimeout(() => {
          wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
          })
        }, 2000)
      }
    }
  },
  //修改笔记时获取笔记内容
  async getArtical(articalId) {
    wx.showNavigationBarLoading();
    const articals = await get("/weapp/articalList", {
      articalId
    });
    let articalDetail = articals.list[0]
    let imageList = []
    articalDetail.images.forEach(item => {
      imageList.push(item.imgSrc)
    })
    wx.setStorageSync('selectPat', articalDetail.patIdArr)
    let animalvalue = JSON.parse(articalDetail.animalvalue)
    let patList = JSON.parse(articalDetail.patIdArr)
    patList.forEach((item, index) => {
      item.value = animalvalue[index]
    })
    let form = {
      title: articalDetail.title,
      content: articalDetail.content,
      imageList: [],
      patList: [],
      location: '',
    }
    this.setData({
      form,
      imageList,
      patList,
      location: articalDetail.location,
    })
    wx.hideNavigationBarLoading();
  }
})