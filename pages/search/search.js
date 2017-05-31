const data = require('../common/data.js')
let url = '', q = '', qt = ''

Page({
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        const fail = () => {
            wx.showModal({
                title: '加载失败',
                showCancel: false,
                success: () => {
                    wx.navigateBack()
                }
            })
        }

        const doLoad = () => {
            wx.request({
                url: url,
                success: res => {
                    if (res.statusCode == 200) {
                        this.setData({
                            list: data[qt].parseList(res.data),
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
        
        q = options.q
        qt = options.qt
        if (!data[options.qt]) {
            fail()
        } else {
            if (options.url) {
                url = decodeURIComponent(options.url)
            } else {
                url = data[options.qt].search(options.q)
            }
            wx.setNavigationBarTitle({
                title: '正在加载',
                success: () => {
                    if (wx.showLoading) {
                        wx.showLoading({
                            title: '正在加载',
                            success: doLoad
                        })
                    } else {
                        wx.showNavigationBarLoading();
                        doLoad()
                    }
                }
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
            title: `${decodeURIComponent(q)} 在 ${qt} 中的搜索结果`,
            path: `pages/search/search?q=${q}&qt=${qt}&url=${encodeURIComponent(url)}`
        }
    }
})