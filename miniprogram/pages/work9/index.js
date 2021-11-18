Page({
    data: {
        incometotal: 0,
        paytotal: 0,
        isincome: true,
        incomelist: [],
        paylist: [],
        isinput: false,
        inputval:'',
        time:'选择日期：',
        timelist: []
    },
    click(e) {
        console.log(e);
        if (e.currentTarget.dataset.name == 'income') {
            this.setData({
                isincome: true
            })
        } else {
            this.setData({
                isincome: false
            })
        }
    },
    add() {
        this.setData({
            isinput: !this.data.isinput
        })
    },
    confirm(e) {
        console.log(e);
        let money = Number(e.detail.value);
        let incomelist = this.data.incomelist;
        let paylist = this.data.paylist;
        let time = this.data.time;
        if (this.data.isincome) {
            incomelist.push([time,money])
            let incometotal = incomelist.reduce((sum, v) => {
                console.log(v);
                
                return sum += v[1];
            }, 0);
            console.log(incomelist);
            
            this.setData({
                incomelist,
                incometotal,
                inputval: '',
                isinput: false
            })
        } else {
            paylist.push([time,money])
            let paytotal = paylist.reduce((sum, v) => {
                return sum += v[1]
            }, 0)
            this.setData({
                paylist,
                inputval: '',
                isinput: false,
                paytotal
            })
        }
    },
    onUnload() {
        console.log('onUnload');
        this.onHide()
    },
    onHide() {
        console.log('onHide');
        let store = [this.data.incomelist, this.data.paylist, this.data.incometotal, this.data.paytotal]
        wx.setStorage({
            data: store,
            key: 'money'
        })
    },
    onLoad(optioin) {
        console.log('onLoad');
        let that = this
        wx.getStorage({
            key: 'money',
            success(e) {
                console.log(e);
                that.setData({
                    incomelist: e.data[0],
                    paylist: e.data[1],
                    incometotal: e.data[2],
                    paytotal:e.data[3]
                })
            }
        })
    },
    bindDateChange(e){
        console.log(e);
        let time = this.data.time;
        let timelist = this.data.timelist;
        time = e.detail.value;
        timelist.push(time)
        this.setData({
            time,
            timelist
        })
    }
})