// pages/line/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shuttle: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var currentLine = wx.getStorageSync('currentLine')
    var shuttle_stations = []
    currentLine.shuttle_stations.map(item=>{
      if (item.station_name != '站点/班次' 
        && item.station_name != '大润发到达时间' 
        && item.station_name != '大润发出发时间' ){
        shuttle_stations.push(item)
      }
    })
    currentLine.shuttle_stations = shuttle_stations
    this.setData({
      shuttle: currentLine
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

  }
})