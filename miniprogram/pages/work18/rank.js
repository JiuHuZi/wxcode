const db = wx.cloud.database();
const directionsColection = db.collection('directions')
let app = getApp()
Page({
  async onLoad(options){
    let res = await directionsColection.get()
    console.log(res);
    let directions = res.data.map(v=>{
      return v.name
    })
    this.setData({
      directions,
      user:app.globalData.user
    })
  }
})