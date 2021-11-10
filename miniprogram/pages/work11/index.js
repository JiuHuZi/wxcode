const utils = require('utils');
Page({
    data: {
        methers: 100000,
        seconds: 1000,
        latitude:0,
        longitude:0
    },
    curLocation(){
        wx.getLocation({
          type:'gcj02'
        }).then(res=>{
            console.log(res);
            let {latitude,longitude} = res
            this.setData({
                latitude,longitude
            })
        })
    },
    onLoad(){
        this.curLocation()
    },
    test(){
        let dis = utils.getDistance(this.data.latitude,this.data.longitude,23.383059,113.44949)
        this.setData({
            methers:dis
        })
    }
})