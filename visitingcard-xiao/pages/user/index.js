// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weChatInfo: {},
    userInfo: null,
    merchantLogos: [],
    merchantPictures:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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
          wx.request({
            url: 'https://www.nanhuaren.cn/vcard/user/merchantDetail',
            data: { userId: userInfo.id },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: res => {
              console.log(res.data)
              if (res.data.code != 0) {
                var userInfo = res.data.data
                var merchantPictures = []
                if (userInfo.merchantPicture != null && userInfo.merchantPicture != '') {
                  merchantPictures = userInfo.merchantPicture.split(',')
                }
                var merchantLogos = []
                if (userInfo.merchantPicture != null && userInfo.merchantLogo != '') {
                  merchantLogos = userInfo.merchantLogo.split(',')
                }
                that.setData({ userInfo: userInfo, merchantPictures: merchantPictures, merchantLogos: merchantLogos })
              }
            }
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
      title: this.data.userInfo.merchantName+'：'+this.data.userInfo.name+'的名片，乐在分享，有乐同享！联系我吧！',
      path: '/pages/user/share?userId=' + this.data.userInfo.id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  bindViewTap: function (event) {
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },

  bindCreateCardTap: function (event) {
    wx.navigateTo({
      url: 'add'
    })
  },

  bindContactUsTap: function (event) {
    wx.makePhoneCall({
      phoneNumber: '18653156091',
    })
  },

  bindApplyTap: function (event) {
    wx.navigateTo({
      url: 'add',
    })
  },

  bindViewImageTap: function (event) {
    var imageId = event.currentTarget.dataset.imageid
    var dataType = event.currentTarget.dataset.datatype
    var urls = []
    if (dataType == '01') {
      urls = ['https://www.nanhuaren.cn/upload/' + imageId]
    } else if (dataType == '02') {
      urls = this.data.merchantLogos.map(function (data) {
        return 'https://www.nanhuaren.cn/upload/' + data
      })
    } else if (dataType == '03') {
      urls = this.data.merchantPictures.map(function (data) {
        return 'https://www.nanhuaren.cn/upload/' + data
      })
    }

    wx.previewImage({
      current: 'https://www.nanhuaren.cn/upload/' + imageId,
      urls: urls,
    })
  }
})