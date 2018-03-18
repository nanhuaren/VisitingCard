//app.js
App({
  onLaunch: function () {
    var that = this
    //获取微信openId和微信用户信息  
    this.getUserInfo(function (userInfo) {
      wx.request({
        url: 'https://www.nanhuaren.cn/vcard/wechat/update',
        data: userInfo,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          wx.setStorageSync("weChatInfo", userInfo)
        }
      })
    })
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          var code = res.code
          wx.request({
            url: 'https://www.nanhuaren.cn/vcard/wechat/login',
            data: {
              code: code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: res => {
              var openId = res.data.data.openId
              wx.getUserInfo({
                success: function (res) {
                  that.globalData.userInfo = res.userInfo
                  that.globalData.userInfo.openId = openId
                  typeof cb == "function" && cb(that.globalData.userInfo)
                },
                fail:function(error){
                  wx.openSetting({
                    success: (res) => {
                      that.checkUserLogin()
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  },
  checkUserLogin: function () {
    var that = this
    //获取微信openId和微信用户信息  
    this.getUserInfo(function (userInfo) {
      wx.request({
        url: 'https://www.nanhuaren.cn/vcard/wechat/update',
        data: userInfo,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          wx.setStorageSync("weChatInfo", userInfo)
          wx.reLaunch({
            url: '/pages/user/index',
          })
        }
      })
    })
  },
  globalData: {
    userInfo: null,
    openId: null,
  }
})