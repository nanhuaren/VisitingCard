// pages/catalog/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catalog: {},
    userId: null,
    catalogPictures: [],
    catalogPictures1: [],
    catalogPictures2: [],
    catalogPictures3: [],
  },

  setCatalogPictures: function () {
    var catalogPictures = this.data.catalogPictures
    var catalogPictures1 = catalogPictures && catalogPictures.length >= 3 ? catalogPictures.slice(0, 3) : catalogPictures.slice(0, catalogPictures.length)
    var catalogPictures2 = catalogPictures && catalogPictures.length >= 6 ? catalogPictures.slice(3, 6) : catalogPictures.slice(3, catalogPictures.length)
    var catalogPictures3 = catalogPictures && catalogPictures.length >= 9 ? catalogPictures.slice(6, 9) : catalogPictures.slice(6, catalogPictures.length)
    this.setData({ catalogPictures1: catalogPictures1, catalogPictures2: catalogPictures2, catalogPictures3: catalogPictures3 })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userId = options.userId
    this.setData({ userId: userId })
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
    var catalog = e.detail.value

    var userId = this.data.userId
    catalog.userId = userId

    if (this.data.catalogPictures) {
      catalog.catalogPicture = this.data.catalogPictures.join(',')
    } else {
      catalog.catalogPicture = this.data.catalog.catalogPicture||''
    }
    wx.request({
      url: 'https://www.nanhuaren.cn/vcard/catalog/add',
      data: catalog,
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
              url: 'list?userId=' + userId,
            })
          }
        })
      }
    })
  },

  bindAddCatalogPictureTap: function (event) {
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
              var catalog = that.data.catalog
              var catalogPictures = that.data.catalogPictures
              catalogPictures.push(data.data)
              catalog.catalogPicture = catalogPictures.join(',')
              that.setData({ catalogPictures: catalogPictures, catalog: catalog })
              that.setCatalogPictures()

            }
          })
        }

      },
    })
  },  

  bindViewImageTap: function (event) {
    var imageId = event.currentTarget.dataset.imageid
    var urls = []
    urls = this.data.catalogPictures.map(function (data) {
      return 'https://www.nanhuaren.cn/upload/' + data
    })

    wx.previewImage({
      current: 'https://www.nanhuaren.cn/upload/' + imageId,
      urls: urls,
    })
  },

  bindDeleteCatalogPicture: function (event) {
    var imageId = event.currentTarget.dataset.imageid
    var catalogPictures = this.data.catalogPictures
    var index = catalogPictures.indexOf(imageId)
    catalogPictures.splice(index, 1)
    this.setData({ catalogPictures: catalogPictures })
    this.setCatalogPictures()

  }
})