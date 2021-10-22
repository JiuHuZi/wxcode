Page({
    data:{
        fei:'',
        feiban:''
    },
    formsubmit(e){
        console.log(e);
        let bd = Number(e.detail.value.property)
        let fei = 0
        let feiban = 0;
        let n1 = 0;
        if(bd > 20000000){
            n1 = (bd - 20000000)
            fei += n1 * 0.5
            bd = bd - n1;
        }
        else if(bd == 20000000 && bd > 10000000){
            n1 = (bd - 10000000)
           fei += n1 * 0.006
            bd = bd - n1
        }
        else if(bd == 10000000 && bd > 5000000){
            n1 = (bd - 5000000)
            fei += n1 * 0.007
             bd = bd - n1
         }
         else if(bd == 5000000 && bd > 2000000){
             n1 = (bd - 2000000);
            fei +=  n1 * 0.008
             bd = bd - n1
         }
         else if(bd == 2000000 && bd > 1000000){
             n1 = (bd - 1000000) 
            fei += n1* 0.009
             bd = bd - n1
         }
         else if(bd == 1000000 && bd > 500000){
             n1 =(bd - 500000)
            fei +=  n1 * 0.01
             bd = bd - n1
         }
         else if(bd == 500000 && bd > 200000){
             n1 = (bd - 200000)
            fei += n1 * 0.015
             bd = bd - n1
         }
         else if(bd == 200000 && bd > 100000){
             n1 = (bd - 100000)
            fei += n1 * 0.02
             bd = bd - n1
         }
         else if(bd == 100000 && bd > 10000){
             n1 = (bd - 10000)
            fei += n1 * 0.025
            bd = bd - n1
         }
        else if(bd <= 10000){
            fei += 50;
        }
        feiban = fei / 2
        fei = fei.toFixed(2)
        feiban = feiban.toFixed(2)
        this.setData({
            fei,feiban
        })

    }
})