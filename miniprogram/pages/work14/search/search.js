// 搜索
const searchUrl = "https://m.douban.com/rexxar/api/v2/search?q="
Page({
  onLoad(option){
    this.setData({
      ...option
    })

    wx.showLoading({
      title: '正在查询',
    })
    wx.request({
      url: searchUrl + this.data.title,
      success:res=>{
        wx.hideLoading({
          success: (res) => {},
        })
        this.setData({
          result:res.data
        })
      }
    })
  }
})