let patTypes = ['猫猫', "狗狗", "蛇蛇", "兔兔"]
import {
  get,
  post
} from "../../utils/index.js";
const qiniuUploader = require("../../utils/qiniuUploader");
const regeneratorRuntime = require('../../utils/regenerator-runtime/runtime')
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      name: '',
      animalName: '',
      sex: null,
      birthday: '',
      weight: null,
      isUnbrith: null,
      character: '',
    },
    animallist: [],
    pattypeIndex: null,
    itemList: [],
    headImg: '',
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let patId = options.id
    if (patId) {
      this.getPatDetail(patId)
    }
    this.getAnimalList()
    // this.getUserInfo()
  },

  dateChange(e) {
    let date = e.detail.value
    console.log(date)
    this.data.form.birthday = date;
    this.setData({
      form: this.data.form
    })
  },

  dataChoose(e) {
    let type = e.currentTarget.dataset.type
    let key = e.currentTarget.dataset.key
    this.data.form[type] = key
    this.setData({
      form: this.data.form
    })
  },

  dataInput(e) {
    let word = e.detail.value;
    let type = e.currentTarget.dataset.type
    this.data.form[type] = word
    this.setData({
      form: this.data.form,
    })
  },
  chooseImage(e) {
    let _this = this
    let token = wx.getStorageSync('token')
    if (!token) {
      this.getToken()
      token = wx.getStorageSync('token')
    }
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // let wechatma = [];
        let tempFilePaths = res.tempFilePaths;
        let filePath = tempFilePaths[0];
        //七牛提供的上传方法
        console.log(filePath)
        qiniuUploader.upload(filePath, (res) => {
          // wechatma.push(res.imageURL)
          _this.setData({
            headImg: res.imageURL,
            // wechatma: wechatma
          });
        }, (error) => {
          console.log('error: ' + error);
        }, {
          region: 'ECN',
          domain: 'http://ppq8kswcf.bkt.clouddn.com/',
          uptoken: token, // 由其他程序生成七牛 uptoken
        });
      }
    })
  },

  patSelect(e) {
    console.log(e.detail.value)
    let index = e.detail.value
    let animalName = this.data.animallist[index].animalName
    let form = this.data.form
    form.animalName = animalName
    this.setData({
      form: form,
      pattypeIndex: index
    })
  },
  // getUserInfo(){
  //   let userInfoStr = wx.getStorageSync('userInfo')
  //   if (userInfoStr) {
  //     let userInfo = JSON.parse(userInfoStr)
  //     this.setData({
  //       userInfo: userInfo
  //     })
  //   }
  // },
  // 获取types列表的数据
  async getAnimalList() {
    const animallist = await get("/weapp/animallist", {});
    let itemList = []
    animallist.list.forEach(item => {
      itemList.push(item.animalName)
    })
    this.setData({
      animallist: animallist.list,
      itemList: itemList
    })
    wx.hideNavigationBarLoading();
  },
  //获取宠物信息
  async getPatDetail(patId) {
    const detail = await get("/weapp/myPatList", {
      patId
    });
    let form = detail.list[0]
    let pattypeIndex = 0
    let animallist = this.data.animallist
    animallist.forEach((item, index) => {
      if (item.animalName == form.animalName) {
        pattypeIndex = index
      }
    })
    this.setData({
      form,
      pattypeIndex,
      headImg: form.headImg
    })
  },

  // 获取token
  async getToken() {
    const token = await get("/weapp/qiniu", {});
    wx.setStorageSync('token', token)
  },
  //提交表单
  async submitForm() {
    let form = this.data.form
    form.headImg = this.data.headImg
    form.openId = app.globalData.openId
    console.log(form)
    let formStr = JSON.stringify(form)
    const submitForm = await post("/weapp/createPat", {
      formStr
    });
  },
})