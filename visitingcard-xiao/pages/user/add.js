// pages/user/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weChatInfo: {},
    userInfo: {},
    headerImg: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var weChatInfo = wx.getStorageSync("weChatInfo")
    var userInfo = this.data.userInfo
    userInfo.openId = weChatInfo.openId
    this.setData({ weChatInfo: weChatInfo, userInfo: userInfo })
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
    var userInfo = e.detail.value
    if (this.data.headerImg) {
      userInfo.headerImg = this.data.headerImg
    } else {
      userInfo.headerImg = this.data.userInfo.headerImg||''
    }
    userInfo.openId = this.data.userInfo.openId
    userInfo.userType = '02'
    wx.request({
      url: 'https://www.nanhuaren.cn/vcard/user/add',
      data: userInfo,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        if(res.data.code == 1){
          wx.showToast({
            title: '新增成功',
            icon: 'success',
            duration: 2000,
            mask: true,
            complete: function () {
              wx.reLaunch({
                url: 'profile',
              })
            }
          })
        }else{
          wx.showToast({
            title: '新增失败',
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
})