var patTypes = ['猫猫', "狗狗", "蛇蛇", "兔兔"]
import {
  get
} from "../../utils/index.js";
const regeneratorRuntime = require('../../utils/regenerator-runtime/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      name: '',
      type: '',
      sex: '',
      brithday: '',
      weight: '',
      isUnBrith: '',
      signText: '',
      animallist: [],
      pattypeIndex:null,
      itemList:[]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAnimalList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  dateChange(e) {
    var date = e.detail.value
    this.data.form.brithday = date;
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

  // patSelect() {
  //   wx.showActionSheet({
  //     itemList: this.data.itemList,
  //     success: res => {
  //       this.data.form.type = this.data.itemList[res.tapIndex]
  //       this.setData({
  //         form: this.data.form
  //       })
  //     }
  //   })
  // },
  patSelect(e){
    console.log(e.detail.value)
    let index = e.detail.value
    let type = this.data.animallist[index].animalName
    this.data.form.type = type
    this.setData({
      form: this.data.form,
      pattypeIndex:index
    })
  },

  // 获取types列表的数据
  async getAnimalList() {
    console.log(1)
    const animallist = await get("/weapp/animallist", {});
    console.log(animallist)
    let itemList = []
    animallist.list.forEach(item => {
      console.log(item)
      itemList.push(item.animalName)
    })
    this.setData({
      animallist: animallist.list,
      itemList: itemList
    })
    wx.hideNavigationBarLoading();
  },
})