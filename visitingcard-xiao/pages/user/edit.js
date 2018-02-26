// pages/user/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    uploadImage: null,
    headerImg: null,
    ownerId:null,
    merchantLogo: null,
    merchantLogos: [],
    merchantLogos1: [],
    merchantLogos2: [],
    merchantLogos3: [],
    merchantPictures: [],
    merchantPictures1: [],
    merchantPictures2: [],
    merchantPictures3: [],
    weixinQrcode: null,
  },

  setMerchantLogo: function () {
    var merchantLogos = this.data.merchantLogos
    var merchantLogos1 = merchantLogos && merchantLogos.length >= 3 ? merchantLogos.slice(0, 3) : merchantLogos.slice(0, merchantLogos.length)
    var merchantLogos2 = merchantLogos && merchantLogos.length >= 6 ? merchantLogos.slice(3, 6) : merchantLogos.slice(3, merchantLogos.length)
    var merchantLogos3 = merchantLogos && merchantLogos.length >= 9 ? merchantLogos.slice(6, 9) : merchantLogos.slice(6, merchantLogos.length)
    this.setData({ merchantLogos1: merchantLogos1, merchantLogos2: merchantLogos2, merchantLogos3: merchantLogos3 })
  },

  setMerchantPictures: function () {
    var merchantPictures = this.data.merchantPictures
    var merchantPictures1 = merchantPictures && merchantPictures.length >= 3 ? merchantPictures.slice(0, 3) : merchantPictures.slice(0, merchantPictures.length)
    var merchantPictures2 = merchantPictures && merchantPictures.length >= 6 ? merchantPictures.slice(3, 6) : merchantPictures.slice(3, merchantPictures.length)
    var merchantPictures3 = merchantPictures && merchantPictures.length >= 9 ? merchantPictures.slice(6, 9) : merchantPictures.slice(6, merchantPictures.length)
    this.setData({ merchantPictures1: merchantPictures1, merchantPictures2: merchantPictures2, merchantPictures3: merchantPictures3 })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var ownerId = options.ownerId
    this.setData({ ownerId:ownerId})
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

  bindAddImgTap: function (event) {
    wx.chooseImage({
      success: function (res) {

      },
    })
  },

  bindSaveTap: function (event) {
    wx.navigateTo({
      url: 'detail'
    })
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var userInfo = e.detail.value
    
    var ownerId = this.data.ownerId
    userInfo.ownerId = ownerId
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
    userInfo.userType = '02'
    wx.request({
      url: 'https://www.nanhuaren.cn/vcard/user/add',
      data: userInfo,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        wx.showToast({
          title: '新增成功',
          icon: 'success',
          duration: 2000,
          mask: true,
          complete: function () {
            wx.reLaunch({
              url: 'list?ownerId=' + ownerId+'&type=04',
            })
          }
        })
      }
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
              that.setMerchantLogo()
              
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
              var merchantPictures = that.data.merchantPictures
              merchantPictures.push(data.data)
              userInfo.merchantPicture = merchantPictures.join(',')
              that.setData({ merchantPictures: merchantPictures, userInfo: userInfo })
              that.setMerchantPictures()
            }
          })
        }

      },
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