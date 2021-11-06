// const baseurl = 'https://apis.juhe.cn/simpleWeather/query?key=8e8a514c5fee064bacceb3cc983a22bf&city='  //聚合API
// const baseurl = 'https://api.map.baidu.com/weather/v1/?data_type=all&ak=r6s5nOxAG0Fm1yLu0roTC9FQ68WxH3aR&district_id='  //百度API
const nowurl = 'https://devapi.qweather.com/v7/weather/now?key=40d969fc118d4128869ac0375e2e7aac&location=' //和风天气API
const baseurl = 'https://devapi.qweather.com/v7/weather/7d?key=40d969fc118d4128869ac0375e2e7aac&location=';
const cityurl = 'https://geoapi.qweather.com/v2/city/lookup?key=40d969fc118d4128869ac0375e2e7aac&location='
Page({
  data: {
    color:'#fff',
    changeimg: './img/day.png',
    isfoot: false,
    NowmaxTemp: 0,
    NowminTemp: 0,
    city: "",
    temperature: 0,
    direct: '-',
    latitude: 0,
    longitude: 0,
    wStatus: '-',
    humidity: 0,
    wPower: 0,
    kPa: 0,
    weather: [{
        day: '',
        maxTemp: '',
        minTemp: '',
        wType: '',
        ico: 0
      },
      {
        day: '',
        maxTemp: '',
        minTemp: '',
        wType: '',
        ico: 0
      },
      {
        day: '',
        maxTemp: '',
        minTemp: '',
        wType: '',
        ico: 0
      }
    ]
  },
  input(e) {

    let city = e.detail.value;
    this.setData({
      city: e.detail.value
    })
  },
  search() {
    let NowmaxTemp = this.data.NowmaxTemp;
    let NowminTemp = this.data.NowminTemp;
    let isfoot = true;
    let city = this.data.city;
    const [adm, loc] = city.split(' ')
    let url = !loc ? `${cityurl}${adm}` : `${cityurl}${loc}&adm=${adm}`;
    let latitude = this.data.latitude;
    let longitude = this.data.longitude;
    console.log(url);
    let burl = `${baseurl}${longitude},${latitude}`;
    console.log(burl);
    let weather = this.data.weather;
    let that = this
    // 用搜索的城市查经纬度
    wx.request({
      url,
      success(e) {
        console.log(e);
        let {
          lat,
          lon
        } = e.data.location[0]
        that.setData({
          latitude: lat,
          longitude: lon
        })

        // 近7天天气
        wx.request({
          url: `${baseurl}${lon},${lat}`,
          success(e) {
            console.log(e);
            let {
              tempMax,
              windDirDay,
              textDay,
              windScaleDay,
              pressure,
              humidity,
              iconDay
            } = e.data.daily
            let index = 0;
            for (var i = 1; i < 4; i++) {
              weather[index].day = e.data.daily[i].fxDate
              weather[index].maxTemp = e.data.daily[i].tempMax
              weather[index].minTemp = e.data.daily[i].tempMin
              weather[index].wType = e.data.daily[i].textDay
              weather[index].ico = e.data.daily[i].iconDay
              index++
            }
            NowmaxTemp = e.data.daily[0].tempMax
            NowminTemp = e.data.daily[0].tempMin
            that.setData({
              weather,
              NowminTemp,
              NowmaxTemp
            })
          }
        })

        wx.request({
          url: `${nowurl}${lon},${lat}`,
          success(e) {
            console.log(e);
            let {
              temp,
              text,
              humidity,
              windDir,
              windScale,
              pressure
            } = e.data.now
            that.setData({
              temperature: temp,
              direct: windDir,
              wStatus: text,
              wPower: windScale,
              kPa: pressure,
              humidity: humidity,
              isfoot: isfoot
            })
          }
        })
      }
    })
  },
  onLoad() {
    let changeimg = this.data.changeimg;
    let txtcolor = this.data.color;
    var myDate = new Date();
    let date = myDate.getHours();
    // console.log(date);
    if (date >= 20) {
      changeimg = './img/night.jpg';
      txtcolor:'#fff';
    }else{
      changeimg = './img/day.png';
      txtcolor:'#000';
    }
    this.setData({
      changeimg,
      color:txtcolor
    })
  }
})