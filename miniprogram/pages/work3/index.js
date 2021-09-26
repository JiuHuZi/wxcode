Page({
  data:{
    result: '不知道'
  },
  submit(e){
    // console.log(e);
    var num1 = Number(e.detail.value.num1);
    var num2 = Number(e.detail.value.num2);
    console.log(num1,'  ',num2);
    
    if(num1 == num2){
      this.setData({
        result:'两个数相等'
      })
    }else if(num1 > num2){
      this.setData({
        result:'第一个数大于第二个数'
      })
    }else if(num1 < num2){
      this.setData({
        result:'第二个数大于第一个数'
      })  
    }
  }
})