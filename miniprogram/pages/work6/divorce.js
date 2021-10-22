Page({
    data:{
        fei:300,
        feiban:150,
        condition:false
    },
    switchchange(e){
        // console.log(e);
        let condition = e.detail.value;
        // console.log(condition);
        if(condition){
            this.setData({
                fei:0,
                feiban:0,
                condition
            })
        }else{
            this.setData({
                fei:300,
                feiban:150,
                condition
            })
        }
    },
    formsubmit(e){
        console.log(e);
        let bd = Number(e.detail.value.property)
        let fei = 0;
        let feiban = 0;
        console.log(bd);
        if(bd<=200000){
            fei = 300;
        }else{
            fei = bd * 0.005
        }
        feiban = fei * 0.5;
        fei = fei.toFixed(2)
        feiban = feiban.toFixed(2)
        this.setData({
            fei,feiban
        })
    }
})