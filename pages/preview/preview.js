let list;

Page({
  onLoad: function (options) {
    const pages = getCurrentPages()
    list = pages[pages.length - 2].data.list.concat()
    this.flip()
  },

  flip: function () {
    list.reverse()
    this.setData({
      missions: list
    })
  }
})