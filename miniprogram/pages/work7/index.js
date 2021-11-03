// const baseurl = 'https://apis.juhe.cn/simpleWeather/query?key=8e8a514c5fee064bacceb3cc983a22bf&city='  //聚合API
const baseurl = 'https://api.map.baidu.com/weather/v1/?data_type=all&ak=r6s5nOxAG0Fm1yLu0roTC9FQ68WxH3aR&district_id='  //百度API
Page({
    data:{
        city:"",
        temperature:'',
        direct:''
    },
    input(e){
        // console.log(e);
        this.setData({
            city:e.detail.value
        })
    },
    search(){
        let city = this.data.city;
        let url = `${baseurl}${city}`;
        console.log(url);
        let that = this
        wx.request({
          url,
          success(e){
              console.log(e);
              let {temp,wind_dir} = e.data.result.now
              that.setData({
                temperature:temp,
                direct:wind_dir
              })
          }
        })
    }
})