const data = require('data.js')

Page({
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: '正在加载',
      success: () => {
        wx.showNavigationBarLoading();
      }
    })

    // debug
    options = {
      q: '南京',
      qt: 'ingressmm'
    }

    const fail = () => {
      wx.showModal({
        title: '加载失败',
        showCancel: false,
        success: () => {
          wx.navigateBack()
        }
      })
    }
    const complete = () => {
      wx.setNavigationBarTitle({
        title: '搜索结果',
        success: () => {
          wx.hideNavigationBarLoading()
        }
      })
    }

    if (!data[options.qt]) {
      fail()
    }

    wx.request({
      url: 'https://aqmh.azurewebsites.net/' + data[options.qt].search(options.q),
      success: res => {
        if (res.statusCode == 200) {
          this.setData({
            list: data[options.qt].parseList(res.data)
          })
        } else {
          fail()
        }
      },
      fail: fail,
      complete: complete
    })
  }
})