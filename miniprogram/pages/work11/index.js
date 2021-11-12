const utils = require('utils');
Page({
    data: {
        methers: 0,
        seconds: 0,
        latitude: 0,
        longitude: 0,
        running: false,
        interval: 1000,
        markers: []
    },
    curLocation() {
        wx.getLocation({
            type: 'gcj02'
        }).then(res => {
            console.log(res);
            let {
                latitude,
                longitude
            } = res
            this.setData({
                latitude,
                longitude
            })
        })
    },
    onLoad() {
        this.curLocation()
    },
    test() {
        let dis = utils.getDistance(this.data.latitude, this.data.longitude, 23.383059, 113.44949)
        this.setData({
            methers: dis
        })
    },
    run() {
        this.setData({
            running: !this.data.running
        })
    },
    record() {
        if (!this.data.running) {
            return
        }
        this.setData({
                seconds: this.data.seconds + this.data.interval / 1000
            }),
            wx.getLocation({
                type: 'gcj02',
            }).then(res => {
                let newMarker = {
                    latitude: res.latitude,
                    longitude: res.longitude,
                    iconPath: 'img/redpoint.png',
                    width: 10,
                    height: 10
                }
                let pace = 0
                let markers = this.data.markers

                if (this.data.markers.length > 0) {
                    let lastmarker = this.data.markers.slice(-1)[0]
                    // console.log(lastmarker);
                    // console.log(newMarker);
                    pace = utils.getDistance(lastmarker.latitude, lastmarker.longitude, newMarker.latitude, newMarker.longitude)
                    console.log(pace);
                    if (pace > 15) {
                        markers.push(newMarker)
                    }else{
                        pace = 10
                    }
                }else{
                    markers.push(newMarker)
                }
                this.setData({
                    latitude:res.latitude,
                    longitude:res.longitude,
                    markers:markers,
                    methers:this.data.methers + pace
                })
            })
    }
})