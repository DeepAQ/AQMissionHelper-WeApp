const data = require('../common/data.js')
let url = ''

Page({
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        wx.setNavigationBarTitle({
            title: '正在加载',
            success: () => {
                if (wx.showLoading) {
                    wx.showLoading({
                        title: '正在搜索'
                    })
                } else {
                    wx.showNavigationBarLoading();
                }
            }
        })

        const fail = () => {
            wx.showModal({
                title: '加载失败',
                showCancel: false,
                success: () => {
                    wx.navigateBack()
                }
            })
        }

        if (!data[options.qt]) {
            fail()
        } else {
            if (options.url) {
                url = options.url
            } else {
                url = data[options.qt].search(options.q)
            }
            wx.request({
                url: url,
                success: res => {
                    if (res.statusCode == 200) {
                        this.setData({
                            list: data[options.qt].parseList(res.data),
                            q: options.q,
                            qt: options.qt
                        })
                        wx.setNavigationBarTitle({
                            title: '搜索结果',
                            success: () => {
                                if (wx.hideLoading) {
                                    wx.hideLoading()
                                } else {
                                    wx.hideNavigationBarLoading()
                                }
                            }
                        })
                    } else {
                        fail()
                    }
                },
                fail: fail
            })
        }
    },

    onMissionTap: e => {
        wx.navigateTo({
            url: `../detail/detail?key=${e.currentTarget.dataset.key}`
        })
    },

    onPreviewTap: () => {
        wx.navigateTo({
            url: '../preview/preview'
        })
    },

    onShareAppMessage: function () {
        return {
            title: `${this.data.q} 在 ${this.data.qt} 中的搜索结果`,
            path: `pages/search/search?q=${this.data.q}&qt=${this.data.qt}&url=${url}`
        }
    }
})