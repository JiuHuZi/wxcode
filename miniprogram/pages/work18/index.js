const app = getApp();
Page({
  data: {
    nickName: '',
    avatarUrl: ''
  },
  async getuserProfile() {
    let res = await wx.getUserProfile({
      desc: '用于完善用户信息',
    })
    console.log(res);
    let {
      nickName,
      avatarUrl
    } = res.userInfo
    console.log(nickName, avatarUrl);
    this.setData({
      nickName,
      avatarUrl
    })
  },
  async formsubmit(e) {
    console.log(e);
    let {
      sn,
      name
    } = e.detail.value
    console.log(sn, name);
    if (!this.data.nickName) {
      wx.showToast({
        title: '请获取微信账号信息',
      })
      return
    }
    if (!sn || !name) {
      wx.showToast({
        title: '请输入学号姓名',
      })
      return
    }
    if (!/\d{8}/.test(sn)) {
      wx.showToast({
        title: '请输入8位学号',
      })
      return
    }

    let nickName = this.data.nickName
    let avatarUrl = this.data.avatarUrl

    let res = await wx.cloud.callFunction({
      name: 'pc_register',
      data: {
        sn,
        name,
        nickName,
        avatarUrl
      }
    })
    console.log('pc_register', res);
    if (res.result.reg == 'ok') {
      app.globalData.user = res.result.user
      wx.showToast({
        title: '绑定成功',
      })
      // 跳转到选择方向页面
      wx.navigateTo({
        url: '/pages/work18/rank',
      })
    } else {
      wx.showModal({
        cancelColor: 'cancelColor',
        title: res.result.reg,
        content: res.result.errMsg
      })
    }
  },
  async onLoad() {
    let res = await wx.cloud.callFunction({
      name: 'pc_login'
    })
    console.log(res);
    app.globalData.user = res.result.result
    if (res.result.result.name != 'nobody') {
      if (res.result.result.choosen?.length > 0) {
        wx.navigateTo({
          url: '/pages/work18/list',
        })
      } else {
        wx.navigateTo({
          url: '/pages/work18/rank',
        })
      }
    }
  }
})