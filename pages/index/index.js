let searchType = 'ingressmm';

Page({
    onRadioChange: e => {
        searchType = e.detail.value
    },

    onSearch: function (e) {
        wx.navigateTo({
            url: `../search/search?q=${e.detail.value}&qt=${searchType}`
        })
    },

    onShareAppMessage: function () {
        return {
            title: '',
            path: 'pages/index/index'
        }
    }
})