
// 获取App.js配置
var app = getApp();

export default function util(page) {
  
  let root = page;
  Object.assign(root, {
    formatTime: function (date, delimiter = '/', dateOnly = false) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()

      var hour = date.getHours()
      var minute = date.getMinutes()
      var second = date.getSeconds()

      var formatedDate = [year, month, day].map(this.formatNumber).join(delimiter)
      if (dateOnly) {
        return formatedDate
      }
      return formatedDate + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
    },

    formatNumber: function (n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    },

    // 数组包含检测方法
    contains: function (arr, obj) {
      if (typeof (arr) != 'object') {
        return false;
      }

      var len = arr.length;
      while (len--) {
        if (arr[len] === obj) {
          return true;
        }
      }
      return false;
    },


    getPrevPage() {
      var pages = getCurrentPages();
      if (pages == null) {
        console.log("getPrevPage, pages null")
        return false;
      }
      var prevPage = pages[pages.length - 2]; //上一个页面
      if (prevPage == null) {
        console.log("getPrevPage, prevPage null")
        return false;
      }
      return prevPage;
    },
    // 获取上一个页面路径
    getPrevPageRoute() {
      const prevPage = this.getPrevPage();
      if (!prevPage) {
        return '';
      }
      return prevPage.route;
    },

    /**
     *  设置上一个页面的值
     */
    setPrevPageData: function (obj) {
      var prevPage = this.getPrevPage();
      if (!prevPage) {
        return false;
      }
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData(obj);
      return true;
    },

    /**
     *  通知上一个页面刷新
     */
    setPrevPageNeedRefresh: function () {
      var isSuccess = this.setPrevPageData({
        needRefreshInOnShow: true
      });
      if (!isSuccess) {
        return false;
      }
      return true;
    },

    goBack: function (str) {
      wx.showModal({
        title: '',
        content: str,
        showCancel: false,
        success: (res => {
          wx.navigateBack();
        })
      })
    },

    showToast(str) {
      wx.showToast({
        title: str,
        icon: 'none'
      })
    },

    showNetWorkToast(res, word) {
      let str = word || '网络错误，请稍后重试'
      if (400 <= res.data.code <= 500 && res.data.message) {
        str = res.data.message
      }
      wx.showToast({
        title: str,
        icon: 'none'
      })
    },
    //获取当前日期，yyyy-mm-dd
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },

    // 编码解码页面长参数，避免&等符号导致的错误
    encodeQueryParam(param) {
      if (typeof param !== 'object') {
        return param;
      }
      return encodeURIComponent(JSON.stringify(param));
    },
    decodeQueryParam(str) {
      let result = null;
      try {
        result = JSON.parse(decodeURIComponent(str));
      } catch (e) {
        console.log('util.js decodeQueryParam err', e)
      }
      return result;
    }
  })

  // 显示繁忙提示
  var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
  })

  // 显示成功提示
  var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
  })

  // 显示失败提示
  var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
      title,
      content: JSON.stringify(content),
      showCancel: false
    })
  }
}
