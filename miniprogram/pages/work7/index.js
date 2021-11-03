// const baseurl = 'https://apis.juhe.cn/simpleWeather/query?key=8e8a514c5fee064bacceb3cc983a22bf&city='  //聚合API
// const baseurl = 'https://api.map.baidu.com/weather/v1/?data_type=all&ak=r6s5nOxAG0Fm1yLu0roTC9FQ68WxH3aR&district_id='  //百度API
   const baseurl = 'https://devapi.qweather.com/v7/weather/now?key=40d969fc118d4128869ac0375e2e7aac&location='  //和风天气API
Page({
    data:{
        city:"",
        temperature:'',
        direct:'',
        latitude:0,
        longitude:0
    },
    input(e){
        // console.log(e);
        this.setData({
            city:e.detail.value
        })
    },
    search(){
        let city = this.data.city;
        let latitude = this.data.latitude;
        let longitude = this.data.longitude;
        let url = `${baseurl}${longitude},${latitude}`;
        console.log(url);
        let that = this
        wx.request({
          url,
          success(e){
              console.log(e);
              let {temp,windDir} = e.data.now
              that.setData({
                temperature:temp,
                direct:windDir
              })
          }
        })
    },
    onLoad(){
      let that = this;
      wx.getLocation({
        success(e){
          let {latitude,longitude} = e;
          that.setData({
            latitude,longitude
          })
        }
      })
    }
})