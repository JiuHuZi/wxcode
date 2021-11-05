Page({
    data:{
        incometotal:0,
        paytotal:0,
        isincome:true,
        incomelist:[],
        paylist:[],
        isinput:true,
        inputval:''
    },
    click(e){
        console.log(e);
        if(e.currentTarget.dataset.name == 'income'){
            this.setData({
                isincome:true
            })
        }else{
            this.setData({
                isincome:false
            })
        }
    },
    add(){
        this.setData({
            isinput : !this.data.isinput
        })
    },
    confirm(e){
        console.log(e);
        let money = Number(e.detail.value);
        let incomelist = this.data.incomelist;
        let paylist = this.data.paylist;
        if(this.data.isincome){
            incomelist.push(money)
            let incometotal = incomelist.reduce((sum,v)=>{
                return sum += v;
            },0);
            this.setData({
                incomelist,
                incometotal,
                inputval:'',
                isinput:false
            })
        }else{
            paylist.push(money)
            let paytotal = paylist.reduce((sum,v)=>{
                return sum += v
            },0)
            this.setData({
                paylist,
                inputval:'',
                isinput:false,
                paytotal
            })
        }
    }
})