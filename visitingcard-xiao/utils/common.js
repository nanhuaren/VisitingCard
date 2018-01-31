const getOpenId = code => {
  var openId = null
  wx.request({
    url: 'https://www.nanhuaren.cn/vcard/wechat/login',
    data: {
      code:code
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: res => {
      openId = res.data.data.openId
    }
  })
  return openId
}

module.exports = {
  getOpenId: getOpenId
}
