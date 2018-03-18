// pages/user/bind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:null,
    userType:null,
    ownerId:null,
    dataType:null,
    unBdindList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ownerId = options.ownerId
    var dataType = options.dataType
    var userId = options.userId
    var userType = options.userType
    var that = this
    wx.request({
      url: 'https://www.nanhuaren.cn/vcard/user/unBindList',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res.data)
        if (res.data.code != 0) {
          var unBdindList = res.data.data
          that.setData({ ownerId: ownerId, dataType: dataType,unBdindList: unBdindList, userId: userId, userType: userType })
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

  formSubmit: function (e) {
    var that = this
    var userId = this.data.userId
    var userType = '01'
    var openId = e.detail.value.openId
    wx.showModal({
      title: '提示',
      content: '确认这是客户的微信吗？',
      complete: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://www.nanhuaren.cn/vcard/user/bind',
            data: { id: userId, openId: openId, userType: userType },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: res => {
              console.log(res.data)
              if (res.data.code != 0) {
                wx.showToast({
                  title: '绑定成功',
                })
                wx.reLaunch({
                  url: 'list?ownerId=' + that.data.ownerId + '&type=' + that.data.dataType,
                })
              }
            }
          })
        }

      }
    })
  },
})