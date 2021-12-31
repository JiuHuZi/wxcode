const db = wx.cloud.database();
const directionsColection = db.collection('directions')
let app = getApp()
Page({
  data: {

  },
  async onLoad(options) {
    let res = await directionsColection.get()
    console.log(res);
    let directions = res.data.map(v => {
      return v.name
    })

    if (app.globalData.user.choosen?.length == 0) {
      app.globalData.user.choosen = directions.slice(0)
    }

    this.setData({
      directions,
      user: app.globalData.user
    })
  },
  change(e) {
    console.log(e);
    // 靠前的志愿可以任意选择，后面的依次变动，后面的志愿不能选择前面选择的
    let choosen = this.data.user.choosen
    let picked = this.data.directions[Number(e.detail.value)]
    // 如果当前选择的专业方向已经出现在志愿里，就拒绝并提示
    let found = choosen.indexOf(picked)
    if (found <= e.currentTarget.dataset.id) {
      wx.vibrateShort({
        type: 'light',
      })
      wx.showToast({
        title: `第${found+1}志愿已经选择了${picked}`,
        icon: 'error'
      })
    } else {
      choosen.splice(e.currentTarget.dataset.id,0,picked)
      choosen.splice(choosen.lastIndexOf(picked),1)
    }
    let user = this.data.user
    user.choosen = choosen
    this.setData({
      user
    })
  },
  post(){
    wx.redirectTo({
      url: '/pages/work18/list',
    })
  }
})