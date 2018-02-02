// pages/user/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfoList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var ownerId = options.ownerId
    wx.request({
      url: 'https://www.nanhuaren.cn/vcard/user/merchantList',
      data: { ownerId: ownerId },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res.data)
        if (res.data.code != 0) {
          var userInfoList = res.data.data
          that.setData({ userInfoList: userInfoList })
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
  onShareAppMessage: function () {

  },

  bindBackTap: function (event) {
    wx.switchTab({
      url: 'profile',
    })
  },

  bindViewUserTap: function (event) {
    var userId = event.currentTarget.dataset.userid
    wx.navigateTo({
      url: 'detail?userId=' + userId,
    })
  },
})