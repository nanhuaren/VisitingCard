// pages/catalog/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catalogList: [],
    userId: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userId = options.userId
    var url = 'https://www.nanhuaren.cn/vcard/catalog/list'    
    wx.request({
      url: url,
      data: { userId: userId },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res.data)
        if (res.data.code != 0) {
          var catalogList = res.data.data
          that.setData({ catalogList: catalogList, userId: userId })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {

  },

  bindAddCatalogTap: function (event) {
    wx.navigateTo({
      url: 'add?userId=' + this.data.userId
    })
  },

  bindDelCatalogTap: function (event) {
    var catalogId = event.currentTarget.dataset.catalogid
    var userId = this.data.userId
    var url = 'https://www.nanhuaren.cn/vcard/catalog/delete'
    wx.request({
      url: url,
      data: { id: catalogId },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res.data)
        if (res.data.code != 0) {
          wx.reLaunch({
            url: 'list?userId='+userId,
          })
        }
      }
    })
  },

  bindBackTap: function (event) {
    wx.reLaunch({
      url: '/pages/user/profile',
    })
  },

  bindEditCatalogTap: function (event) {
    var userId = this.data.userId
    var catalogId = event.currentTarget.dataset.catalogid
    wx.navigateTo({
      url: 'edit?userId=' + userId + '&catalogId=' + catalogId,
    })
  },
})