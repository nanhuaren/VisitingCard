// pages/user/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfoList: [],
    ownerId: null,
    dataType: null,
    userInfo: null,
    showBind:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var ownerId = options.ownerId
    var dataType = options.type
    var title = ''
    var url = ''
    if (dataType == '01') {
      title = '所有代理'
      url = 'https://www.nanhuaren.cn/vcard/user/agentList'
    } else if (dataType == '02') {
      title = '所有客户'
      url = 'https://www.nanhuaren.cn/vcard/user/userList'
    } else if (dataType == '03') {
      title = '我的代理'
      url = 'https://www.nanhuaren.cn/vcard/user/myAgentList'
    } else if (dataType == '04') {
      title = '我的客户'
      url = 'https://www.nanhuaren.cn/vcard/user/myUserList'
    } else if (dataType == '05') {
      title = '申请客户'
      url = 'https://www.nanhuaren.cn/vcard/user/applyList'
    }
    wx.setNavigationBarTitle({
      title: title,
    })
    wx.request({
      url: url,
      data: { ownerId: ownerId },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res.data)
        if (res.data.code != 0) {
          var userInfoList = res.data.data
          that.setData({ userInfoList: userInfoList, ownerId: ownerId, dataType: dataType })
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
  onShareAppMessage: function (res) {
    console.log(res)
    var userId = res.target.dataset.userid
    var merchantName = res.target.dataset.merchantname
    var name = res.target.dataset.username
    var headerImg = res.target.dataset.headerimg
    return {
      title: merchantName + '：' + name + '的名片，乐在分享，有乐同享！联系我吧！',
      path: '/pages/user/share?userId=' + userId,
      imageUrl: 'https://www.nanhuaren.cn/upload/' + headerImg,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }

  },

  bindPreviewTap: function (event) {
    var userId = event.currentTarget.dataset.userid
    console.log(userId)
    wx.navigateTo({
      url: '/pages/user/share?userId=' + userId
    })
  },

  bindShareTap: function (event) {
    var userId = event.currentTarget.dataset.userid
    var that = this
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
          that.setData({ userInfo: userInfo })
          that.onShareAppMessage()
        }
      }
    })
  },

  bindCallTap: function (event) {
    var mobile = event.currentTarget.dataset.mobile
    wx.makePhoneCall({
      phoneNumber: mobile,
    })
  },

  bindAddUserTap: function (event) {
    wx.navigateTo({
      url: 'edit?ownerId=' + this.data.ownerId
    })
  },

  bindBackTap: function (event) {
    wx.reLaunch({
      url: 'profile',
    })
  },

  bindViewUserTap: function (event) {
    var userId = event.currentTarget.dataset.userid
    var dataType = event.currentTarget.dataset.datatype
    wx.navigateTo({
      url: 'detail?userId=' + userId + '&type=' + dataType,
    })
  },

  bindBindWXTap: function (event) {
    var that = this
    var userId = event.currentTarget.dataset.userid
    var userType = event.currentTarget.dataset.usertype
    var dataType = that.data.dataType
    var ownerId = that.data.ownerId
    wx.navigateTo({
      url: 'bind?userId=' + userId + '&userType=' + userType + '&dataType=' + dataType + '&ownerId=' + ownerId,
    })
  },

  bindOpenWXTap: function (event) {
    var that = this
    var userId = event.currentTarget.dataset.userid
    var userType = event.currentTarget.dataset.usertype
    var dataType = that.data.dataType
    var ownerId = that.data.ownerId
    wx.showModal({
      title: '提示',
      content: '确定要开通该客户?',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://www.nanhuaren.cn/vcard/user/open',
            data: { id: userId, userType: '01' },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: res => {
              console.log(res.data)
              if (res.data.code != 0) {
                wx.showToast({
                  title: '开通成功',
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

  bindUnBindWXTap: function (event) {
    var userId = event.currentTarget.dataset.userid
    var openId = event.currentTarget.dataset.openid
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要解绑该客户?',
      success: function (res) {
        if (res.confirm){
          wx.request({
            url: 'https://www.nanhuaren.cn/vcard/user/unBind',
            data: { id: userId, openId: openId },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: res => {
              console.log(res.data)
              if (res.data.code != 0) {
                wx.showToast({
                  title: '解绑成功',
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