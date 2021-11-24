const url = 'http://127.0.0.1:9999/sampledata';
Page({
  onLoad() {
    wx.request({
      url,
      success: res => {
        console.log(res);
        this.setData(res.data)
      }
    })
  },
  submit(e){
    console.log(e);
    wx.request({
      url,
      method:'POST',
      data:e.detail.value,
      success:res=>{
        this.setData(res.data)
      }
    })
  }
})