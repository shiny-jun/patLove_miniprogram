// pages/userDataEdit/userDataEdit.js
import {
    get,
    post,
    showSuccess,
    showModal
} from "../../utils/index.js";
const regeneratorRuntime = require('../../utils/regenerator-runtime/runtime')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sexArray: ['未知', '男', '女', ],
        userInfo: {},
        signature: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let userInfoStr = wx.getStorageSync('userInfo')
        if (!userInfoStr) {
            wx.showModal({
                title: '数据错误',
                content: '请稍后重试',
                success: res => {
                    if (res.confirm) {
                        wx.navigateBack()
                    }
                }
            })
            return
        }
        if (userInfoStr) {
            let userInfo = JSON.parse(userInfoStr)
            this.setData({
                userInfo: userInfo,
            })
        }
        this.getSignature()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    pickChange(e) {
        let key = e.currentTarget.dataset.type
        this.data.userInfo[key] = e.detail.value
        this.setData({
            userInfo: this.data.userInfo
        })
    },
    datainput(e) {
        // console.log(e.detail.value)
        this.setData({
            signature: e.detail.value
        })
    },
    async save() {
        let openId = this.data.userInfo.openId
        let signature = this.data.signature
        let res = await post('/weapp/signature', { openId, signature })
        if (res.data == 'ok') {
            showSuccess('成功')
        } else {
            showModal('提交失败')
        }
    },
    async getSignature() {
        let openId = this.data.userInfo.openId
        let detail = await get('/weapp/signature', { openId })
        console.log(detail)
        if(detail.list){
            this.setData({
            signature: detail.list[0].signature
        })
        }
    }
})