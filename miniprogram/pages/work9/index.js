Page({
    data: {
        incometotal: 0,
        paytotal: 0,
        isincome: true,
        incomelist: [],
        paylist: [],
        isinput: false,
        inputval: '',
        time: '选择月份：',
        day: '选择日期',
        monthMList: [],
        monthPList: [],
        Mintotal: 0,
        Mpaytotal: 0,
        ischange: false,
        isshowMonth:false
    },
    click(e) {
        // console.log(e);
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
        let time = this.data.time;
        time = '选择月份：'
        this.setData({
            isinput: !this.data.isinput,
            ischange:true,
            time,
            isshowMonth:false
        })
    },
    confirm(e) {
        console.log(e);
        let money = Number(e.detail.value);
        let incomelist = this.data.incomelist;
        let paylist = this.data.paylist;
        let time = this.data.time;
        let day = this.data.day;

        if (this.data.isincome) {
            incomelist.push([day, money])

            let incometotal = incomelist.reduce((sum, v) => {
                console.log(v);
                return sum += v[1];
            }, 0);
            console.log(incomelist);
            incomelist.sort();

            this.setData({
                incomelist,
                incometotal,
                inputval: '',
                isinput: false,
                
            })
        } else {
            paylist.push([day, money])
            // console.log(paylist);

            let paytotal = paylist.reduce((sum, v) => {
                return sum += v[1]
            }, 0)
            this.setData({
                paylist,
                inputval: '',
                isinput: false,
                paytotal,
                
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
                    paytotal: e.data[3],
                    ischange:true
                })
            }
        })
    },
    bindDateChange(e) {
        console.log(e);
        let time = this.data.time;
        let incomelist = this.data.incomelist;
        let paylist = this.data.paylist;
        time = e.detail.value;
        let monthMList = [];
        let monthPList = [];
        // let isshowMonth = this.data.isshowMonth;
        for (let i = 0; i < incomelist.length; i++) {
            if (incomelist[i][0].split('-')[0] + '-' + incomelist[i][0].split('-')[1] == time) {
                console.log('一样');
                monthMList.push(incomelist[i]);
            }
            console.log(monthMList);
        }
        let Mintotal = monthMList.reduce((sum, v) => {
            return sum += v[1]
        }, 0)

        for (let i = 0; i < paylist.length; i++) {
            if (paylist[i][0].split('-')[0] + '-' + paylist[i][0].split('-')[1] == time) {
                console.log('一样');
                monthPList.push(paylist[i]);
            }
            console.log(monthPList);
        }
        let Mpaytotal = monthPList.reduce((sum, v) => {
            return sum += v[1]
        }, 0)

        this.setData({
            time,
            monthMList,
            monthPList,
            Mintotal,
            Mpaytotal,
            ischange:false,
            isshowMonth:true
        })
    },
    bindDayChange(e) {
        let day = this.data.day;
        day = e.detail.value;
        
        this.setData({
            day,
        })
    }
})