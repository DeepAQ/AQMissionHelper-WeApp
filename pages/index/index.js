let searchType = 'ingressmm';

Page({
    data: {
        trending: []
    },

    onLoad: function (options) {
        wx.request({
            url: 'https://aqmh.azurewebsites.net/data/dssq.js',
            success: res => {
                if (res.statusCode == 200) {
                    this.setData({
                        trending: res.data
                    })
                }
            }
        })
    },

    onRadioChange: e => {
        searchType = e.detail.value
    },

    onSearch: e => {
        wx.navigateTo({
            url: `../search/search?q=${encodeURIComponent(e.detail.value)}&qt=${searchType}`
        })
    },

    onTrendingTap: function (e) {
        wx.navigateTo({
            url: `../search/search?${this.data.trending[e.target.dataset.key]}`
        })
    },

    onShareAppMessage: () => {
        return {
            title: '',
            path: 'pages/index/index'
        }
    }
})