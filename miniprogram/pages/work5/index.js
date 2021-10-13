Page({
    data:{
        num:'0',
        op:''
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
        console.log(e);
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
            this.lastNum += curNum;
        }else if(op == '-'){
            this.lastNum -= curNum;
        }else if(op == '*'){
            this.lastNum *= curNum;
        }else if(op == '/'){
            this.lastNum /= curNum;
        }else if(op == '%'){
            this.lastNum %= curNum;
        }else if(op == '='){
            this.lastNum = curNum;
        }
        this.setData({
            num:this.lastNum
        })
    }
})