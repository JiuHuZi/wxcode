// 初始化数据库
const db = wx.cloud.database();
// 链接pics集合
const pics = db.collection('pics');
// 链接votes集合
const votes = db.collection('votes');
const $ = db.command.aggregate
Page({
  data: {
    maxvote: 3,
  },
  async onLoad(option) {
    let res = await pics.get();
    let plist = res.data
    res = await votes.get()
    let vlist = res.data
    

    // 调用云函数login
    res = await wx.cloud.callFunction({
      name: 'login'
    })
    console.log('login', res);
    let openid = res.result.openid
    let voted = false
    let votesum = 0
    let today = new Date()
    today = today.toJSON().slice(0, 10)
    console.log(today);
    // 将云函数返回的_openid跟votes集合的openid匹配，如果投过票就放回true
    vlist.forEach(v => {
      if (v._openid == openid && v.data.toJSON().slice(0, 10) == today) {
        votesum += 1
      }
      console.log(votesum);


    })
    plist.forEach(v => {
      // 为plist的数据加上一个count来记录票数
      v.count = 0,
      v.border = false,
        // 判断点击的图片是哪一张为其的count加一
        vlist.forEach(vv => {
            if (vv.fileid == v.fileid) {
              v.count += 1;
              v.border = true
            }
        })
    })
    this.setData({
      voted,
      votesum,
    })

    this.setData({
      plist,
      vlist
    })

    // 查找投的是哪一张图片查找他的current
    if (option.fileid) {
      let current = plist.findIndex(v => {
        return v.fileid == option.fileid
      })
      // 将找到的current发送给setTitleBar方法
      this.setTitleBar(current)
      this.setData({
        current
      })
    } else {
      // 找不到就跳到第0页
      this.setTitleBar(0)
    }
  },
  // long() {
  //   // 打开相册
  //   wx.chooseImage({
  //     count: 1,
  //     success: res => {
  //       console.log(res);
  //       // 获取相册选择的图片地址
  //       let filename = res.tempFilePaths[0]
  //       console.log(filename);
  //       // 获取相册选择的文件的文件名
  //       let purfilename = filename.split('/').slice(-1)[0]
  //       console.log(purfilename);
  //       // 上传到云开发数据库
  //       wx.cloud.uploadFile({
  //         // 添加到云开发数据库的地址
  //         cloudPath: 'image/' + purfilename,
  //         // 手机文件地址
  //         filePath: filename,
  //         success: res => {
  //           console.log(res);
  //           // 上传成功的返回的fileid
  //           let fileid = res.fileID
  //           // 将新的fileid追加到pics集合
  //           pics.add({
  //             data: {
  //               fileid
  //             },
  //             success: res => {
  //               console.log(res);
  //               if (res.errMsg.indexOf('ok') > -1) {
  //                 wx.showToast({
  //                   title: '图片上传成功',
  //                 })
  //               } else {
  //                 wx.showToast({
  //                   icon: 'error',
  //                   title: '图片上传失败',
  //                 })
  //               }
  //             }
  //           })
  //         }
  //       })
  //     }
  //   })
  // }
  async long() {
    let res = await wx.chooseImage({
      count: 1,
    })
    console.log(res);
    let filename = res.tempFilePaths[0]
    let purfilename = filename.split('/').slice(-1)[0]
    res = await wx.cloud.uploadFile({
      cloudPath: 'image/' + purfilename,
      filePath: filename,
    })
    let fileid = res.fileID
    res = await pics.add({
      data: {
        fileid
      }
    })
    if (res.errMsg.indexOf('ok') > -1) {
      await wx.showToast({
        title: '图片上传成功',
      })
    } else {
      await wx.showToast({
        icon: 'error',
        title: '图片上传失败',
      })
    }
    // 上传完图片就跳转到上传的那张图片的位置
    wx.reLaunch({
      url: '/pages/work15/index?fileid=' + fileid,
    })
  },
  async tap(e) {
    console.log(e);
    // 如果voted的值是true就显示“已投过票不能再投”后终止向下继续执行
    if (this.data.votesum >= 3) {
      wx.showToast({
        title: '超过投票次数',
      })
      return
    } else {
      wx.showToast({
        title: '还有' + (Number(this.data.maxvote) - Number(this.data.votesum) - 1) + '次投票机会',
      })
    }
    let fileid = e.currentTarget.dataset.id;
    let res = await votes.add({
      data: {
        fileid,
        data: db.serverDate()
      }
    })
    console.log(res);
    if (res.errMsg.indexOf('ok') > -1) {
      wx.showToast({
        title: '投票成功',
      })
    } else {
      wx.showToast({
        icon: 'error',
        title: '投票失败',
      })
    }
    // 投完票就跳转到投的那张图片的位置
    wx.reLaunch({
      url: '/pages/work15/index?fileid=' + fileid,
    })
  },
  setTitleBar(current) {
    // 设置小程序标题为某一张多少票
    wx.setNavigationBarTitle({
      title: current + 1 + '/' + this.data.plist.length + '  还剩' + (this.data.maxvote - this.data.votesum) + '票'
    })
  },
  change(e) {
    console.log(e);
    this.setTitleBar(e.detail.current)
  }
})