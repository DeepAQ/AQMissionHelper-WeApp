const wgstogcj = require('../common/wgstogcj.js')

Page({
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        const pages = getCurrentPages()
        const detailData = pages[pages.length - 2].data
        const task_list = [
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

        let markers = []
        for (let key in detailData.portals) {
            const po = detailData.portals[key]
            if (po.lat && po.lng) {
                const gcjPos = wgstogcj.transform(po.lat, po.lng)
                const no = Number(key) + 1 + ''
                markers.push({
                    latitude: gcjPos.lat,
                    longitude: gcjPos.lng,
                    title: po.name,
                    label: {
                        content: no,
                        fontSize: 14,
                        x: -5,
                        y: 10
                    },
                    callout: {
                        content: `${no}. ${po.name}\n${task_list[po.task]}`,
                        fontSize: 16,
                        borderRadius: 5,
                        padding: 10
                    }
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