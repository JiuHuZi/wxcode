Page({
  data:{
    result: '',
    color:'red'
  },
  submit(e){
    // console.log(e);
    var num1 = Number(e.detail.value.num1);
    var num2 = Number(e.detail.value.num2);
    console.log(num1,'  ',num2);
    
    if(num1 == num2){
      this.setData({
        result:'两数相等',
        color:'#000'
      })
    }else if(num1 > num2){
      this.setData({
        result:'第1个数大',
        color:'red'
      })
    }else if(num1 < num2){
      this.setData({
        result:'第2个数大',
        color:'blue'
      })  
    }
  }
})