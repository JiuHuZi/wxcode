const calc = require('calc.js');
Page({
    data:{
        num:'0',
        op:'',
        fh:'<'
    },
    lastNum:0,
    isNewNum:false,
    clear(){
        this.isNewNum = true;
        this.lastNum = 0;
        this.setData({
            num: '0',
            op:''
        })
    },
    delete(){
        let num = this.data.num;
        num = num.substr(0,num.length -1);
        num = num == '' ? '0' : num;
        this.setData({
            num
        })
    },
    numbtn(e){
        // console.log(e);
        let val = e.currentTarget.dataset.val;
        let num = this.data.num;
        if(num == '0' || this.isNewNum){
            num = val
            this.isNewNum = false;
        }else{
            num += val;
        }
        this.setData({
            num
        })
    },
    dotbtn(){
        let num = this.data.num;
        if(num.indexOf('.')>=0){
            return;
        }
        num += '.';
        this.setData({
            num
        })
    },
    opbtn(e){
        console.log(e);
        let op = this.data.op;
        let val = e.currentTarget.dataset.val;
        let curNum = Number(this.data.num);
        this.setData({
            op:val
        })
        this.isNewNum = true;
        if(this.lastNum == 0){
            this.lastNum = curNum;
            return
        }
        if(op == '+'){
            this.lastNum = calc.add(this.lastNum,curNum);
        }else if(op == '-'){
            this.lastNum = calc.sub(this.lastNum,curNum);
        }else if(op == '*'){
            this.lastNum = calc.mul(this.lastNum,curNum);
        }else if(op == '/'){
            this.lastNum = calc.div(this.lastNum,curNum);
        }else if(op == '%'){
            this.lastNum %= curNum;
        }else if(op == '='){
            this.lastNum = curNum;
        }else if(op == 'pf'){
            this.lastNum *= this.lastNum
        }else if(op == 'kf'){
            this.lastNum = Math.sqrt(this.lastNum)
        }else if(op == 'sin'){
            let radius = this.lastNum * Math.PI / 180
            if(this.lastNum % 180 == 0) radius = 0
            this.lastNum = Math.sin(radius)
        }else if(op == 'cos'){
            let radius = this.lastNum * Math.PI / 180
            this.lastNum = Math.cos(radius)
        }
        this.setData({
            num:this.lastNum
        })
    }
})
