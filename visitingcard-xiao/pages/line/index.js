// pages/line/index.js

const commonApi = require('../../utils/api.js')

//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store: {},
    defaultLine: null,
    lines: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.storeNo == null) {
      var userLocation = app.globalData.userLocation || {}
      var store = commonApi.getDefaultStore(userLocation.latitude, userLocation.longitude)
      var lines = commonApi.getStoreLines(store.store_no)
      var currentProvince = { 
        province_name: store.province_name,
        province_no: store.province_no
      }
      var currentCity = {
        name: store.city_name,
        city_no: store.city_no
      }
      var currentStore = {
        name: store.store_name,
        store_no: store.store_no
      }
      wx.setStorageSync('currentProvince', currentProvince)
      wx.setStorageSync('currentCity', currentCity)
      wx.setStorageSync('currentStore', currentStore)
      this.setData({
        store: store,
        lines: lines
      })
    } else {
      var currentProvince = wx.getStorageSync('currentProvince')
      var currentCity = wx.getStorageSync('currentCity')
      var currentStore = wx.getStorageSync('currentStore')
      var provinceNo = currentProvince.province_no
      var cityNo = currentCity.city_no
      var storeNo = currentStore.store_no
      var store = {
        province_no: provinceNo,
        province_name: currentProvince.province_name,
        city_no: cityNo,
        city_name: currentCity.name,
        store_no: storeNo,
        store_name: currentStore.name
      }
      wx.request({
        url: 'https://www.nanhuaren.cn/data/province/city/store/shuttle/' + storeNo + '.json', //获取门店
        data: {
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          this.setData({
            store: store,
            lines: res.data
          })
        }
      })
    }



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

  //查看班车路线详情
  bindLineDetailTap: function (event) {
    var shuttle = event.currentTarget.dataset.shuttle
    this.setData({
      defaultLine: shuttle
    })
    var currentLine = {}
    this.data.lines.map(item => {
      if (item.shuttle_no == shuttle) {
        currentLine = item
      }
    })
    wx.setStorageSync('currentLine', currentLine)
    wx.navigateTo({
      url: '/pages/line/detail/index?lineNo=' + shuttle
    })
  },

  //省市切换
  bindChooseProvinceTap: function (event) {
    wx.navigateTo({
      url: '/pages/province/list'
    })
  },
  //门店切换
  bindChooseStoreTap: function (event) {
    wx.navigateTo({
      url: '/pages/province/city/store/list'
    })
  },
})