// pages/system/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentSize: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var res = wx.getStorageInfoSync()
    var currentSize = res.currentSize
    this.setData({ currentSize: currentSize })
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

  bindClearTap: function (event) {
    wx.showModal({
      title: '提示',
      content: '确定要清除缓存吗？',
      complete: function () {
        wx.switchTab({
          url: '/pages/user/profile',
        })
      }
    })
  }
})