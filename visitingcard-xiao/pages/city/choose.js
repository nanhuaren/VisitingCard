// pages/city/choose.js
const commonApi = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentProvince: {},
    historyProvinces: [],
    hotProvinces: [],
    allProvinces:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var currentProvince = commonApi.getCurrentProvince()
    var historyProvinces = commonApi.getHistoryProvince()
    var hotProvinces = commonApi.getHotProvince()
    var allProvinces = commonApi.getAllProvince()

    var provinceItem = []
    var provinceList = []
    for (var i = 0; i < hotProvinces.length;i++){
      provinceItem.push(hotProvinces[i])
      if (provinceItem.length%3==0){
        provinceList.push(provinceItem)
        provinceItem = []
      }
    }
    wx.request({
      url: 'https://www.nanhuaren.cn/data/province/list.json', //获取所有省份
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res=> {
        this.setData({
          allProvinces: res.data
        })
      }
    })

    this.setData({
      currentProvince: currentProvince,
      historyProvinces: historyProvinces,
      //allProvinces: allProvinces,
      hotProvinces: provinceList
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
    wx.request({
      url: 'https://www.nanhuaren.cn/data/province/city/' + province+'.json', //获取所有省份
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res.data)
      }
    })
  },
})