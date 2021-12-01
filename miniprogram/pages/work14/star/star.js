Component({
  properties: {
    stars: {
      type: Number,
      value: 0
    },
    show:{
      type:Boolean,
      value:true
    }
  },
  lifetimes: {
    attached() {
      // console.log(this.data.stars);
      let fstar = 'a'.repeat(Math.floor(this.data.stars / 2))
      let hstar = this.data.stars % 2 != 0
      let estar = 'a'.repeat(Math.floor((10 - this.data.stars) / 2))
      this.setData({
        fstar,
        hstar,
        estar
      })
      // console.log(fstar, hstar, estar);
    }
  }
})