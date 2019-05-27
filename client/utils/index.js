// 工具函数库
import config from '../config'

function request(url, method, data) {
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
    icon: 'success',
  })
}

// 吐司封装
export function showToast(text) {
  wx.showToast({
    title: text,
    icon: 'none',
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

// 弹窗封装
export function getTime(time) {
  let dt = new Date(time)
  let y = dt.getFullYear()
  let m = dt.getMonth()+1<10?'0'+(dt.getMonth()+1):dt.getMonth()+1
  let d = dt.getDate()<10?'0'+dt.getDate():dt.getDate()
  let h = dt.getHours()<10?'0'+dt.getHours():dt.getHours()
  let mm = dt.getMinutes()<10?'0'+dt.getMinutes():dt.getMinutes()
  return `${y}-${m}-${d} ${h}:${mm}`
}
// 获取日期
export function getDate(time) {
  let dt = new Date(time)
  let y = dt.getFullYear()
  let m = dt.getMonth()+1<10?'0'+(dt.getMonth()+1):dt.getMonth()+1
  let d = dt.getDate()<10?'0'+dt.getDate():dt.getDate()
  return `${y}-${m}-${d}`
}
