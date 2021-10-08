Page({
  data:{
    src:'images/c.png',
    list:[
      {name:'C',active:true,src:'images/c.png'},
      {name:'D',active:false,src:'images/d.png'},
      {name:'E',active:false,src:'images/e.png'},
      {name:'F',active:false,src:'images/f.png'},
      {name:'G',active:false,src:'images/g.png'},
      {name:'A',active:false,src:'images/a.png'},
      {name:'B',active:false,src:'images/b.png'},
    ]
  },
  click(e){
    // console.log(e);
    const id = e.target.dataset.id;
    this.data.list.forEach(v => {
      v.active = false;
    })
    this.data.list[id].active = true;
    this.setData({
      src:this.data.list[id].src,
      list:this.data.list
    })
  }
  
})
