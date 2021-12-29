//app.js
App({
  onLaunch: async function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
        env: 'cloud1-7g245pll714f761e'
      })
    }

    this.globalData = {}

    let res = await wx.cloud.callFunction({
      name: 'pc_login'
    })
    console.log(res);
    this.globalData.user = res.result.result

    if (res.result.result.name == 'nobody') {
      wx.navigateTo({
        url: '/pages/work18/index',
      })
    } else {
      if (res.result.result.choosen?.length > 0){
        wx.navigateTo({
          url: '/pages/work18/list',
        })
      }else{
        wx.navigateTo({
          url: '/pages/work18/rank',
        })
      }
    }
  }
})