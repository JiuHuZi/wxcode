// 初始化数据库
const db = wx.cloud.database();
// 链接pics集合
const pics = db.collection('pics');
// 链接votes集合
const votes = db.collection('votes');
Page({
  onLoad() {
    pics.get().then(res => {
      console.log(res);
      this.setData({
        plist: res.data
      })
    })
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
      wx.showToast({
        title: '图片上传成功',
      })
    } else {
      wx.showToast({
        icon: 'error',
        title: '图片上传失败',
      })
    }
  }
})