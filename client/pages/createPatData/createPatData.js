let patTypes = ['猫猫', "狗狗", "蛇蛇", "兔兔"]
import {
  get,
  post,
  showSuccess,
  showToast,
  getDate,
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
    userInfo: null,
    toastShow:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAnimalList()
    let patId = options.id
    if (patId) {
      this.getPatDetail(patId)
    }
    // this.getUserInfo()
  },

  dateChange(e) {
    let date = e.detail.value
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
  // 显示输入框
  toastShowChange(){
    let toastShow = !this.data.toastShow
    console.log(toastShow)
    this.setData({toastShow})
  },
  toastInput(e){
    let word = e.detail.value;
    this.setData({
      vaccine:word,
    })
  },
  // 确认疫苗名称
  submitVaccine(){
    let vaccineList = this.data.vaccineList
    vaccineList.push(this.data.vaccine)
    this.setData({
      vaccineList
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
          domain: 'http://prfo1ihvv.bkt.clouddn.com',
          uptoken: token, // 由其他程序生成七牛 uptoken
        });
      }
    })
  },
  patSelect(e) {
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
    form.birthday = getDate(form.birthday)
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
    console.log(form)
    if(!form.name){
      showToast('请输入主子昵称')
    } else if(!form.animalName){
      showToast('请选择主子所属种类')
    } else if(!form.sex){
      showToast('请选择主子性别')
    } else if(!form.birthday){
      showToast('请选择主子生日')
    }
    form.headImg = this.data.headImg
    form.openId = app.globalData.openId
    let formStr = JSON.stringify(form)
    const res = await post("/weapp/createPat", {
      formStr
    });
    console.log(res)
    if (res.data == 'ok') {
      showSuccess('保存成功')
      setTimeout(() => {
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
        })
      }, 2000)
    }
  },
  delPat() {
    let patId = this.data.form.patId
    let _this = this
    wx.showModal({
      title: '提示',
      content: '请问是否删除' + this.data.form.name + '?',
      success(res) {
        if (res.confirm) {
          _this.delete(patId)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  async delete(patId){
    const res = await post("/weapp/delete", {
      patId
    });
    if (res.data == 'ok') {
      showSuccess('删除成功')
      setTimeout(() => {
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
        })
      }, 2000)
    }
  }
})