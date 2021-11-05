Page({
    data: {
        incometotal: 0,
        paytotal: 0,
        isincome: true,
        incomelist: [],
        paylist: [],
        isinput: true,
        inputval: ''
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
        if (this.data.isincome) {
            incomelist.push(money)
            let incometotal = incomelist.reduce((sum, v) => {
                return sum += v;
            }, 0);
            this.setData({
                incomelist,
                incometotal,
                inputval: '',
                isinput: false
            })
        } else {
            paylist.push(money)
            let paytotal = paylist.reduce((sum, v) => {
                return sum += v
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

    }
})