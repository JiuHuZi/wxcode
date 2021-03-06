const utils = require('utils');
let fmarkers = [];
let timer = 0;
Page({
    data: {
        methers: 0,
        seconds: 0,
        latitude: 0,
        longitude: 0,
        running: false,
        interval: 1000, //获取当前坐标的时间间隔（毫秒）
        markers: [],
        feedbackrate:50,    //回放的时间间隔（毫秒）    
        polyline:[{
            points:[],
            color:'#ff0000DD',
            width:2
        }]
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
        this.curLocation(),
            setInterval(this.record, this.data.interval)
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
                    console.log(lastmarker);
                    console.log(newMarker);
                    pace = utils.getDistance(lastmarker.latitude, lastmarker.longitude, newMarker.latitude, newMarker.longitude)
                    console.log(pace);
                    if (pace > 15) {
                        markers.push(newMarker)
                    } else {
                        pace = 0
                    }
                } else {
                    markers.push(newMarker)
                }
                this.setData({
                    latitude: res.latitude,
                    longitude: res.longitude,
                    markers: markers,
                    methers: this.data.methers + pace
                })
            })
    },
    clear() {
        this.setData({
            markers: [],
            methers: 0,
            seconds: 0
        })
    },
    save(){
        wx.setStorage({
          data: this.data.markers,
          key: 'running',
        }).then(()=>{
            wx.showToast({
              title: '保存成功',
            })
        })
    },
    playback(){
        this.clear()
        wx.getStorage({
          key: 'running',
        }).then(res=>{
            fmarkers = res.data
        })
        timer = setInterval(this.feedback,this.data.feedbackrate)
    },
    feedback(){
        let lmarkers = this.data.markers;
        let lpolyline = this.data.polyline;
        if(fmarkers.length > 0){
            lmarkers.push(fmarkers.shift());
            lpolyline[0].points = lmarkers
        }else{
            clearInterval(timer)
        }
        this.setData({
            markers:lmarkers,
            polyline:lpolyline
        })
    }
})