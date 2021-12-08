const xq = 'https://m.douban.com/rexxar/api/v2/'
//  /tags?count=8
const bq = 'https://m.douban.com/rexxar/api/v2/'
// querystring : count=5&start=1
const dp = 'https://m.douban.com/rexxar/api/v2/'
const count = 5;
Page({
  data: {
    start: 0,
    type: '',
    id: '',
    bqlist:[]
  },
  onLoad(option) {
    console.log(option);
    let {
      type,
      id
    } = option
    this.setData({
      type,
      id
    })


    wx.request({
      url: xq + option.type + '/' + option.id,
      success: res => {
        console.log('xq', res);
        let mygenres = res.data.genres.join('/')
        let myactors = res.data.actors.slice(0, 3).map(v => {
          return v.name
        }).join('/')
        this.setData({
          xq: res.data,
          mygenres,
          myactors,
        })
      }
    })

    wx.request({
      url: bq + option.type + '/' + option.id + '/tags?count=8',
      success: res => {
        console.log(res);
        this.setData({
          bq: res.data
        })
      }
    })

    wx.request({
      url: dp + option.type + '/' + option.id + '/interests?count=5',
      success: res => {
        console.log(res);
        this.setData({
          dp: res.data,
        })
      }
    })

  },
  onReachBottom() {
    this.setData({
      start: this.data.start + count
    })
    let url = dp + this.data.type + '/' + this.data.id + '/interests?start=' + this.data.start + '&count=' + count
    console.log(url);
    wx.request({
      url,
      success: res => {
        console.log(res);
        let dp = this.data.dp
        let ttt = dp.interests
        console.log(ttt);
        let sss = res.data.interests
        console.log(sss);

        ttt = ttt.concat(sss)
        dp.interests = ttt;
        this.setData({
          dp
        })
      }
    })
  }
})