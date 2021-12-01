const url = "https://vue3antdv-7gcma6b228a5b287-1256680780.tcloudbaseapp.com/api/v2/subject_collection/movie_showing/items";
const dsjUrl = "https://vue3antdv-7gcma6b228a5b287-1256680780.tcloudbaseapp.com/api/v2/subject_collection/tv_hot/items"
const zyUrl = "https://vue3antdv-7gcma6b228a5b287-1256680780.tcloudbaseapp.com/api/v2/subject_collection/tv_variety_show/items"
Page({
  onLoad(){
    wx.request({
      url,
      success:res=>{
        console.log(res);
        this.setData({
          movielist:res.data.ssubject_collection_item,
        })
      }
    })

    wx.request({
      url:dsjUrl,
      success:res=>{
        //console.log(res);
        this.setData({
          dsjlist:res.data.ssubject_collection_item,
        })
      }
    })

    wx.request({
      url:zyUrl,
      success:res=>{
        // console.log(res);
        this.setData({
          zylist:res.data.ssubject_collection_item,
        })
      }
    })

  }
})