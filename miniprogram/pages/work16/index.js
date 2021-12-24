// 初始化数据库
const db = wx.cloud.database();
const votes = db.collection('votes')
const pics = db.collection('pics')
const $ = db.command.aggregate

Page({
  data: {
    maxvote: 3,
  },
  async onLoad(option) {
    

    let res = await wx.cloud.callFunction({
      name: 'getPics'
    })
    console.log(res);
    let plist = res.result.plist

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

    res = await votes.aggregate()
      .match({
        _openid: openid
      })
      .project({
        _openid: 1,
        'date': $.dateToString({
          date: '$date',
          format: '%Y-%m-%d'
        })
      })
      .match({
        date: today
      })
      .group({
        _id: '$_openid',
        count: $.sum(1)
      })
      .end()
    console.log(res);

    votesum = res.list[0] ? res.list[0].count : 0
    this.setData({
      votesum
    })

    plist.forEach(v => {
      v.border = false
      vlist.forEach(vv => {
          if (vv.fileid == v.fileid) {
            v.count += 1;
            v.border = true
          }
        })
    })

    this.setData({
      plist,
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
      url: '/pages/work16/index?fileid=' + fileid,
    })
  },
  async tap(e) {
    console.log(e);
    console.log(this.data.votesum);
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
        date: db.serverDate()
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
      url: '/pages/work16/index?fileid=' + fileid,
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