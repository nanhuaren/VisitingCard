// pages/province/city/store/list.js
// pages/province/city/list.js
const commonApi = require('../../../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    stores: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var currentProvince = wx.getStorageSync('currentProvince')
    var currentCity = wx.getStorageSync('currentCity')
    var provinceNo = currentProvince.province_no
    var cityNo = currentCity.city_no
    wx.request({
      url: 'https://www.nanhuaren.cn/data/province/city/store/' + provinceNo + '_' + cityNo+'.json', //获取门店
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        this.setData({
          stores: res.data
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
  bindChooseStoreTap: function (event) {
    var store = event.currentTarget.dataset.store
    var currentStore = {}
    this.data.stores.map(item => {
      if (item.store_no == store) {
        currentStore = item
      }
    })
    wx.setStorageSync('currentStore', currentStore)
    wx.navigateTo({
      url: '/pages/line/index?storeNo=' + store
    })
  },
})