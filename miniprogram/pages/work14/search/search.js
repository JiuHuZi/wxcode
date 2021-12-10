// 搜索
const searchUrl = "https://m.douban.com/rexxar/api/v2/search?q="
Page({
  input(e) {
    console.log(e);
    this.setData({
      title: e.detail.value
    })
  },
  search(){
    wx.navigateTo({
      url: 'search?title='+this.data.title,
    })
  },
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