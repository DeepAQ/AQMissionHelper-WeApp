const wgstogcj = require('../common/wgstogcj.js')

Page({
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    const pages = getCurrentPages()
    const detailData = pages[pages.length - 2].data

    let markers = []
    for (let key in detailData.portals) {
      const po = detailData.portals[key]
      if (po.lat && po.lng) {
        const gcjPos = wgstogcj.transform(po.lat, po.lng)
        markers.push({
          latitude: gcjPos.lat,
          longitude: gcjPos.lng,
          title: po.name
        })
      }
    }

    this.setData({
      lat: markers[0].latitude,
      lng: markers[0].longitude,
      markers: markers
    })
  }
})