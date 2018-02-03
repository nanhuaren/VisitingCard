// pages/user/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfoList: [],
    ownerId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var ownerId = options.ownerId
    var type = options.type
    var title = ''
    var url = ''
    if (type == '01') {
      title = '所有代理'
      url = 'https://www.nanhuaren.cn/vcard/user/agentList'
    } else if (type == '02') {
      title = '所有客户'
      url = 'https://www.nanhuaren.cn/vcard/user/userList'
    } else if (type == '03') {
      title = '我的代理'
      url = 'https://www.nanhuaren.cn/vcard/user/myAgentList'
    } else if (type == '04') {
      title = '我的客户'
      url = 'https://www.nanhuaren.cn/vcard/user/myUserList'
    } else if (type == '05') {
      title = '申请客户'
      url = 'https://www.nanhuaren.cn/vcard/user/applyList'
    }
    wx.setNavigationBarTitle({
      title: title,
    })
    wx.request({
      url: url,
      data: { ownerId: ownerId },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res.data)
        if (res.data.code != 0) {
          var userInfoList = res.data.data
          that.setData({ userInfoList: userInfoList, ownerId: ownerId })
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

  bindAddUserTap: function (event) {
    wx.navigateTo({
      url: 'edit?ownerId=' + this.data.ownerId
    })
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