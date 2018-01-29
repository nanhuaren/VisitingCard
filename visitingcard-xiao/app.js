//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          // wx.request({
          //   url: 'https://www.nanhuaren.cn/vcard/wechat/login',
          //   data: { code: res.code },
          //   header: {
          //     'content-type': 'application/json' // 默认值
          //   },
          //   success: res => {
          //     console.log(res)
          //   }
          // })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }

      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // wx.request({
              //   url: 'https://www.nanhuaren.cn/vcard/wechat/update',
              //   data: {
              //     openId: "oDHca0ecprX946AH4jiDzah4ajlw",
              //     nickName: res.userInfo.nickName,
              //     avatarUrl: res.userInfo.avatarUrl,
              //     gender: res.userInfo.gender,
              //     city: res.userInfo.city,
              //     province: res.userInfo.province,
              //     country: res.userInfo.country,
              //     language: res.userInfo.language
              //   },
              //   header: {
              //     'content-type': 'application/json' // 默认值
              //   },
              //   success: res => {
              //     console.log(res)
              //   }
              // })

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    //获取当前地理位置
    wx.getLocation({
      success: res => {
        // 定位到最近门店
        var userLocation = {
          latitude: res.latitude,
          longitude: res.longitude
        }
        this.globalData.userLocation = userLocation
      },
    })
  },
  globalData: {
    userInfo: null,
    userLocation: null
  }
})