const baseurl = 'http://apis.juhe.cn/simpleWeather/query?key=8e8a514c5fee064bacceb3cc983a22bf&city='
Page({
    data:{
        city:"",
        temperature:'',
        direct:''
    },
    input(e){
        console.log(e);
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
              let {temperature,direct} = e.data.result.realtime
              that.setData({
                temperature,direct
              })
          }
        })
    }
})