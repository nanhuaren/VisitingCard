// pages/user/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weChatInfo: {},
    userInfo: null,
    userCount:0,
    totalAgent: 0,
    totalUser: 0,
    totalAplly:0,
    agentCount: 0,
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
          if (userInfo.userType == '00' || userInfo.userType == '03') {
            wx.request({
              url: 'https://www.nanhuaren.cn/vcard/user/totalCount',
              data: { ownerId: userInfo.id },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: res => {
                console.log(res.data)
                if (res.data.code != 0) {
                  var userCount = res.data.data.myUserCount
                  var totalAgent = res.data.data.agentCount
                  var totalUser = res.data.data.userCount
                  var totalAplly = res.data.data.applyCount
                  var agentCount = res.data.data.myAgentCount
                  that.setData({ userCount: userCount, totalAgent: totalAgent, totalUser: totalUser, totalAplly: totalAplly, agentCount: agentCount })                  
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

  

  bindAddUserTap: function (event) {
    wx.navigateTo({
      url: 'edit?ownerId=' + this.data.userInfo.id
    })
  },

  bindContactUsTap: function (event) {
    wx.makePhoneCall({
      phoneNumber: '18653156091',
    })
  },

  bindListUserTap: function (event) {
    var type = event.currentTarget.dataset.type
    wx.navigateTo({
      url: 'list?ownerId=' + this.data.userInfo.id + '&type=' + type
    })
  },

  bindSettingTap: function (event) {
    wx.navigateTo({
      url: 'setting'
    })
  },

  bindCatalogTap: function (event) {
    wx.navigateTo({
      url: '/pages/catalog/list?userId=' + this.data.userInfo.id
    })
  },

  bindSystemSettingTap: function (event) {
    wx.navigateTo({
      url: '/pages/system/setting'
    })
  },

  bindAbountUsTap: function (event) {
    wx.navigateTo({      
      url: '/pages/system/about'
    })
  },

})