// const baseurl = 'https://apis.juhe.cn/simpleWeather/query?key=8e8a514c5fee064bacceb3cc983a22bf&city='  //聚合API
// const baseurl = 'https://api.map.baidu.com/weather/v1/?data_type=all&ak=r6s5nOxAG0Fm1yLu0roTC9FQ68WxH3aR&district_id='  //百度API
  //  const baseurl = 'https://devapi.qweather.com/v7/weather/now?key=40d969fc118d4128869ac0375e2e7aac&location='  //和风天气API
  const baseurl = 'https://devapi.qweather.com/v7/weather/3d?key=40d969fc118d4128869ac0375e2e7aac&location='
Page({
    data:{
        city:"",
        temperature:0,
        direct:'',
        latitude:0,
        longitude:0,
        wStatus:'晴',
        humidity:0,
        wPower:0,
        kPa:0,
        weather:[
          {day:'11-05',maxTemp:'1',minTemp:'1',wType:'晴'},
          {day:'11-06',maxTemp:'2',minTemp:'2',wType:'晴'},
          {day:'11-07',maxTemp:'3',minTemp:'3',wType:'晴'}
        ]
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
        let weather = this.data.weather;
        console.log(url);
        let that = this
        wx.request({
          url,
          success(e){
              console.log(e);
              let {tempMax,windDirDay,textDay,windScaleDay,pressure,humidity} = e.data.daily[0]
              for(var i = 0;i<3;i++){
                weather[i].day = e.data.daily[i].fxDate
                weather[i].maxTemp = e.data.daily[i].tempMax
                weather[i].minTemp = e.data.daily[i].tempMin
                weather[i].wType = e.data.daily[i].textDay
              }
              that.setData({
                temperature:tempMax,
                direct:windDirDay,
                wStatus:textDay,
                wPower:windScaleDay,
                kPa:pressure,
                humidity:humidity,
                weather:weather
              })
          }
        })
     }
})