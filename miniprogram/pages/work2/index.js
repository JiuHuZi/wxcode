Page({
  data:{
    msg:'意外不意外'
  },
  kkk(){
    if(this.data.msg == '意外不意外'){
      this.setData({
        msg:'惊喜不惊喜'
      });
    }else{this.setData({
      msg:'意外不意外'
    });

    }
  }
})