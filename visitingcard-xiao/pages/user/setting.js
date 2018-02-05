// pages/user/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weChatInfo: {},
    userInfo: null,
    headerImg: null,
    merchantLogo: null,
    uploadImage: null,
    merchantLogos: [],
    merchantPictures:[],
    weixinQrcode: null,
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
                if (userInfo.merchantPicture != null && userInfo.merchantPicture!=''){
                  merchantPictures = userInfo.merchantPicture.split(',')
                }
                var merchantLogos = []
                if (userInfo.merchantLogo != null && userInfo.merchantLogo != '') {
                  merchantLogos = userInfo.merchantLogo.split(',')
                }
                var weixinQrcode = null
                if (userInfo.weixinQrcode != null && userInfo.weixinQrcode != '') {
                  weixinQrcode = userInfo.weixinQrcode
                }
                that.setData({ userInfo: userInfo, merchantPictures: merchantPictures, merchantLogos: merchantLogos, weixinQrcode: weixinQrcode})
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


  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var data = e.detail.value
    var userInfo = this.data.userInfo
    if (this.data.headerImg) {
      userInfo.headerImg = this.data.headerImg
    } else {
      userInfo.headerImg = this.data.userInfo.headerImg
    }
    if (this.data.weixinQrcode) {
      userInfo.weixinQrcode = this.data.weixinQrcode
    } else {
      userInfo.weixinQrcode = this.data.userInfo.weixinQrcode
    }
    if (this.data.merchantPictures) {
      userInfo.merchantPicture = this.data.merchantPictures.join(',')
    } else {
      userInfo.merchantPicture = this.data.userInfo.merchantPicture
    }
    if (this.data.merchantLogos) {
      userInfo.merchantLogo = this.data.merchantLogos.join(',')
    } else {
      userInfo.merchantLogo = this.data.userInfo.merchantLogo
    }
    data.id = userInfo.id
    data.headerImg = userInfo.headerImg
    data.weixinQrcode = userInfo.weixinQrcode;
    data.merchantLogo = userInfo.merchantLogo
    data.merchantPicture = userInfo.merchantPicture
    wx.request({
      url: 'https://www.nanhuaren.cn/vcard/user/modify',
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        if (res.data.code == 1) {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000,
            mask: true,
            complete: function () {
              wx.reLaunch({
                url: 'profile',
              })
            }
          })
        } else {
          wx.showToast({
            title: '保存失败',
            icon: 'warn',
            duration: 2000,
            mask: true
          })
        }
      }
    })
  },

  bindAddUserImgTap: function (event) {
    var that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.uploadFile({
          url: 'https://www.nanhuaren.cn/vcard/file/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = JSON.parse(res.data)
            console.log(data)
            var userInfo = that.data.userInfo
            userInfo.headerImg = data.data.join(',')
            that.setData({ headerImg: data.data.join(','), userInfo: userInfo })
          }
        })
      },
    })
  },

  bindAddWeixinQrcodeTap: function (event) {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.uploadFile({
          url: 'https://www.nanhuaren.cn/vcard/file/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = JSON.parse(res.data)
            console.log(data)
            var userInfo = that.data.userInfo
            var weixinQrcode = data.data.join(',')
            userInfo.weixinQrcode = weixinQrcode
            that.setData({ weixinQrcode: weixinQrcode, userInfo: userInfo })
          }
        })
      },
    })
  },

  bindAddMerchantLogoTap: function (event) {
    var that = this
    var that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: 'https://www.nanhuaren.cn/vcard/file/upload',
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {
              'user': 'test'
            },
            success: function (res) {
              var data = JSON.parse(res.data)
              console.log(data)
              var userInfo = that.data.userInfo
              var merchantLogos = that.data.merchantLogos
              merchantLogos.push(data.data)
              userInfo.merchantLogo = merchantLogos.join(',')
              that.setData({ merchantLogos: merchantLogos, userInfo: userInfo })
            }
          })
        }

      },
    })
  },

  bindAddMerchantImgTap: function (event) {
    var that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        for (var i=0;i<tempFilePaths.length;i++){
          wx.uploadFile({
            url: 'https://www.nanhuaren.cn/vcard/file/upload',
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {
              'user': 'test'
            },
            success: function (res) {
              var data = JSON.parse(res.data)
              console.log(data)
              var userInfo = that.data.userInfo
              var merchantPictures = that.data.merchantPictures
              merchantPictures.push(data.data)
              userInfo.merchantPicture = merchantPictures.join(',')
              that.setData({ merchantPictures:merchantPictures, userInfo: userInfo })
            }
          })
        }

      },
    })
  },
})