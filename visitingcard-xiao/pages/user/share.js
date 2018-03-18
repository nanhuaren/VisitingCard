// pages/user/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    showWeixin:false,
    merchantLogos: [],
    merchantPictures: [],
    weixinQrcode:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userId = options.userId
    wx.request({
      url: 'https://www.nanhuaren.cn/vcard/user/merchantDetail',
      data: { userId: userId },
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
          var weixinQrcode = []
          if (userInfo.weixinQrcode != null && userInfo.weixinQrcode != '') {
            weixinQrcode = userInfo.weixinQrcode
          }
          that.setData({ userInfo: userInfo, merchantPictures: merchantPictures, merchantLogos: merchantLogos, weixinQrcode: weixinQrcode})
          if (userInfo.userType == '02') {
            wx.setNavigationBarTitle({
              title: '名片预览',
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
    return {
      title: this.data.userInfo.merchantName + '：' + this.data.userInfo.name + '的名片，乐在分享，有乐同享！联系我吧！',
      path: '/pages/user/share?userId=' + this.data.userInfo.id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  bindCallTap: function (event) {
    this.setData({ showWeixin: false })
    var mobile = this.data.userInfo.mobile
    wx.makePhoneCall({
      phoneNumber: mobile,
    })
  },

  
  bindHomeTap: function(event) {
    this.setData({ showWeixin: false })
    wx.switchTab({
      url: 'index',
    })
  },

  bindWeixinTap: function (event) {
    if (this.data.weixinQrcode != null && this.data.weixinQrcode !=''){
      this.setData({ showWeixin: !this.data.showWeixin })
    }else{
      wx.showModal({
        title: '提示',
        content: '对不起，请先上传微信二维码',
      })
    }
    
  },

  bindMessageTap: function (event) {
    this.setData({ showWeixin: false })
    var name = this.data.userInfo.name
    wx.addPhoneContact({
      firstName: name,
      nickName:name,
      remark: this.data.userInfo.description,
      mobilePhoneNumber: this.data.userInfo.mobile,
      weChatNumber: this.data.userInfo.weixin,
      addressState: this.data.userInfo.province,
      addressCity: this.data.userInfo.city,
      addressStreet: this.data.userInfo.address,
      organization: this.data.userInfo.merchantName,
      title: this.data.userInfo.merchantPosition,
      workFaxNumber: this.data.userInfo.fax,
      workPhoneNumber: this.data.userInfo.tel,
      email: this.data.userInfo.email
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