module.exports = {
    ingressmm: {
        search: function (key, success, fail) {
            wx.request({
                url: 'https://aqmh.azurewebsites.net/get_mission.php?find=' + encodeURIComponent(key) + '&findby=0',
                success: res => {
                    if (res.statusCode == 200) {
                        success(this.parseList(res.data))
                    } else {
                        fail()
                    }
                },
                fail: fail
            })
        },

        parseList: json => {
            let list = []
            // Smart Sort
            const getNum = name => {
                name = name.replace(/[\s-]/g, "")
                const regs = [/[(（\[【{]*(\d+)[/)）\]】}]/i, /(\d+)$/i]
                for (let i in regs) {
                    const matches = name.match(regs[i])
                    if (matches && matches.length >= 2)
                        return Number(matches[1])
                }
                return false
            }
            for (let key in json.mission) {
                const item = json.mission[key]
                list.push({
                    type: 'ingressmm',
                    id: item.id,
                    name: item.name,
                    number: getNum(item.name),
                    seq: item.sequence,
                    lat: item.latitude,
                    lng: item.longitude,
                    icon: 'https://ingressmm.com/icon/' + item.code + '.jpg'
                })
            }
            list = list.sort((a, b) => {
                if (a.number == b.number) return (a.name > b.name ? 1 : -1)
                if (a.number === false) return 1
                if (b.number === false) return -1
                return a.number - b.number
            })
            return list
        },

        getPortals: (mission, success, fail) => {
            wx.request({
                url: 'https://aqmh.azurewebsites.net/get_portal.php?mission=' + mission.id,
                success: function (res) {
                    if (res.statusCode == 200) {
                        let portals = []
                        if (res.data.portal) {
                            for (let key in res.data.portal) {
                                const po = res.data.portal[key]
                                if (po[0]) {
                                    portals.push({
                                        hidden: true
                                    })
                                } else {
                                    portals.push({
                                        hidden: false,
                                        task: po[1],
                                        name: po[2].name,
                                        lat: po[2].latitude,
                                        lng: po[2].longitude
                                    })
                                }
                            }
                        }
                        success(portals)
                    } else {
                        fail()
                    }
                },
                fail: fail
            })
        }
    }
}