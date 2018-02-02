// pages/user/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weChatInfo: {},
    userInfo: {},
    count:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: '个人中心',
    })
    var weChatInfo = wx.getStorageSync("weChatInfo")
    this.setData({ weChatInfo: weChatInfo })
    wx.request({
      url: 'https://www.nanhuaren.cn/vcard/user/get',
      data: { openId: weChatInfo.openId },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res.data)
        if (res.data.code != 0) {
          var userInfo = res.data.data
          that.setData({ userInfo: userInfo })
          if (userInfo.userType == '00') {
            wx.request({
              url: 'https://www.nanhuaren.cn/vcard/user/count',
              data: { ownerId: userInfo.id },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: res => {
                console.log(res.data)
                if (res.data.code != 0) {
                  var count = res.data.data
                  that.setData({ count: count })                  
                }
              }
            })
          }
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

  bindAddUserTap: function (event) {
    wx.navigateTo({
      url: 'edit'
    })
  },

  bindContactUsTap: function (event) {

  },

  bindListUserTap: function (event) {
    wx.navigateTo({
      url: 'list?ownerId='+this.data.userInfo.id
    })
  },


})