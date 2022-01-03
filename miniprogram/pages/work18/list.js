const app = getApp()
const db = wx.cloud.database()
const directionCollection = db.collection('directions')
Page({
  data: {
    user: null,
    list: [],
    directions: [],
    nums: [],
    tab: 0,
    result: '',
  },
  async onLoad() {
    // 读取专业方向和限额
    let res = await directionCollection.where({}).get()
    let directions = res.data.map(v => {
      return v.name
    })
    let nums = res.data.map(v => {
      return v.num
    })

    res = await wx.cloud.callFunction({
      name: 'pc_statistics'
    })
    console.log(res);

    // 查找本人专业方向
    let result = res.result.list.find(v => {
      return v.name == app.globalData.user.name
    }).choosen

    let tab = directions.indexOf(result)
    let list = []
    
    directions.forEach(v => {
      list.push(res.result.list.filter(vv => {
        return vv.choosen == v
      }))
    })
    this.setData({
      user: app.globalData.user,
      list,
      result,
      tab,
      directions,
      nums
    }) 
   
  },
  rank() {
    wx.redirectTo({
      url: '/pages/work18/rank',
    })
  },
  changeItem(e) {
    console.log(e);
    this.setData({
      tab: e.currentTarget.dataset.item
    })
  },
  changeTab(e) {
    console.log(e);
    this.setData({
      tab: e.detail.current
    })
  },
})