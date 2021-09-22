Page({
  data:{
    msg:'惊喜不惊喜'
  },
  kkk(){
    if(this.data.msg == '惊喜不惊喜'){
      this.setData({
        msg:'意外不意外'
      });
    }else{this.setData({
      msg:'惊喜不惊喜'
    });

    }
  }
})