// miniprogram/pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {name:'张三',score:{miniapp:100,php:99,linux:98}},
      {name:'李四',score:{miniapp:89,php:88,linux:87}},
      {name:'王五',score:{miniapp:58,php:68,linux:48}},
      {name:'赵六',score:{miniapp:66,php:66,linux:66}},
    ],
    msg:'hello world'
  },
click(e){
  const id = e.target.dataset.id;
  console.log(id);
  wx.showToast({
    title: `${this.data.list[id].name} : ${this.data.list[id].score.miniapp},${this.data.list[id].score.php}`
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})