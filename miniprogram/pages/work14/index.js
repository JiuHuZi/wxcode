// 主页
const url = "https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items";
// 电视剧
const dsjUrl = "https://m.douban.com/rexxar/api/v2/subject_collection/tv_hot/items"
// 综艺
const zyUrl = "https://m.douban.com/rexxar/api/v2/subject_collection/tv_variety_show/items"
Page({
  data: {
    title: ''
  },
  input(e) {
    console.log(e);
    this.setData({
      title: e.detail.value
    })
  },
  search(){
    wx.navigateTo({
      url: 'search/search?title='+this.data.title,
    })
  },
  onLoad(){
    wx.request({
      url,
      success:res=>{
        //console.log(res);
        this.setData({
          movielist:res.data.subject_collection_items,
        })
      }
    })

    wx.request({
      url:dsjUrl,
      success:res=>{
        //console.log(res);
        this.setData({
          dsjlist:res.data.subject_collection_items,
        })
      }
    })

    wx.request({
      url:zyUrl,
      success:res=>{
        // console.log(res);
        this.setData({
          zylist:res.data.subject_collection_items,
        })
      }
    })
  }
})