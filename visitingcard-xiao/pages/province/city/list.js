// pages/province/city/list.js
const commonApi = require('../../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    citys: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var provinceNo = options.provinceNo
    console.log(provinceNo)
    wx.request({
      url: 'https://www.nanhuaren.cn/data/province/city/' + provinceNo+'.json', //获取市
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res.data)
        this.setData({
          citys: res.data
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
    var city = event.currentTarget.dataset.city
    var currentCity = {}
    this.data.citys.map(item => {
      if (item.city_no == city) {
        currentCity = item
      }
    })
    wx.setStorageSync('currentCity', currentCity)
    wx.navigateTo({
      url: '../city/store/list?cityNo=' + city
    })
  },
})