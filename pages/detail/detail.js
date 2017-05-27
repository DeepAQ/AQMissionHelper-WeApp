const data = require('../common/data.js')
const wgstogcj = require('../common/wgstogcj.js')

Page({
    data: {
        task_list: [
            "",
            "Hack this Portal",
            "Capture or Upgrade Portal",
            "Create Link from Portal",
            "Create Field from Portal",
            "Install a Mod on this Portal",
            "Enter the Passphrase",
            "View this Field Trip Waypoint",
            "Enter the Passphrase"
        ]
    },

    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        wx.setNavigationBarTitle({
            title: '正在加载',
            success: () => {
                if (wx.showLoading) {
                    wx.showLoading({
                        title: '正在加载'
                    })
                } else {
                    wx.showNavigationBarLoading();
                }
            }
        })

        const pages = getCurrentPages()
        const searchData = pages[pages.length - 2].data
        this.setData({
            mission: searchData.list[options.key]
        })

        data[searchData.qt].getPortals(searchData.list[options.key], result => {
            this.setData({
                portals: result
            })
            wx.setNavigationBarTitle({
                title: '任务详情',
                success: () => {
                    if (wx.hideLoading) {
                        wx.hideLoading()
                    } else {
                        wx.hideNavigationBarLoading()
                    }
                }
            })
        }, () => {
            wx.showModal({
                title: '加载失败',
                showCancel: false,
                success: () => {
                    wx.navigateBack()
                }
            })
        })
    },

    onMapTap: () => {
        wx.navigateTo({
            url: '../map/map'
        })
    },

    onNavigateTap: e => {
        const gcjPos = wgstogcj.transform(e.currentTarget.dataset.lat, e.currentTarget.dataset.lng)
        console.log(gcjPos)
        wx.openLocation({
            latitude: gcjPos.lat,
            longitude: gcjPos.lng,
            name: e.currentTarget.dataset.name,
            address: e.currentTarget.dataset.description
        })
    }
})