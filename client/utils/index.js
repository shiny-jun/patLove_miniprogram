// 工具函数库
import config from '../config'

function request(url, method, data) {
  console.log(url)
  return new Promise((reslove, reject) => {
    wx.request({
      data: data,
      method: method,
      url: config.service.host + url,
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      success: (res) => {
        if (res.data.code == 0) {
          reslove(res.data.data)
        } else {
          showModal('失败', res.data.data.msg)
          reject(res.data)
        }
      }
    })
  })
}

export function get(url, data) {
  return request(url, 'GET', data)
}

export function post(url, data) {
  return request(url, 'POST', data)
}


// 吐司封装
export function showSuccess(text) {
  wx.showToast({
    title: text,
    content: 'success',
  })
}

// 弹窗封装
export function showModal(title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}

export function login(userInfo, callback, reset) {
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      if (res.code) {
        //存用户信息
        wx.setStorageSync('userInfo', userInfo)
        // 扫面二维码进入
        // let Scene = wx.getStorageSync('scene')
        let userInfoStr = JSON.stringify(userInfo);
        console.log(userInfoStr)
      } else {

      }
    }
  })
}
