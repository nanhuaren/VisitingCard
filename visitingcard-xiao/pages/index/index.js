// pages/index/index.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = app.globalData.userInfo
    const openId = userInfo.openId
    //检查用户信息是否存在
    wx.request({
      url: 'https://www.nanhuaren.cn/vcard/user/' + openId,
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res)        
        if(res.data.code != 1){
          wx.navigateTo({
            url: '../user/index'
          })
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
    return {
      title: '熙普之光的名片',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  bindWeixinTap: function (event) {  
    wx.navigateTo({
      url: 'weixin'
    })
  },
})