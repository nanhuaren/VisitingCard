// pages/province/list.js
const commonApi = require('../../utils/api.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    provinces: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://www.nanhuaren.cn/data/province/list.json', //获取所有省份
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        this.setData({
          provinces: res.data
        })
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

  //门店切换
  bindChooseCityTap: function (event) {
    var province = event.currentTarget.dataset.province
    var currentProvince = {}
    this.data.provinces.map(item => {
      if (item.province_no == province) {
        currentProvince = item
      }
    })
    wx.setStorageSync('currentProvince', currentProvince)

    wx.navigateTo({
      url: '/pages/province/city/list?provinceNo=' + province
    })
  },
})