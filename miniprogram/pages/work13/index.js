const db = wx.cloud.database()
const ml = db.collection('musiclist')
const audioCtx = wx.createInnerAudioContext();
Page({
  data: {
    tab: 0,
    item: 0,
    playIndex: 0,
    state: 'paused',
    play: {
      currentTime: 0,
      duration: 0,
      percent: 0,
      title: '',
      singer: '',
      coverImg: '',
    }
  },
  onLoad() {
    ml.get().then(res => {
      console.log(res);
      this.setData({
        musiclist: res.data,
      })
      this.selectMusic(0)
    })
    audioCtx.onError(() => {
      console.log('播放失败' + audioCtx.src);
    })
    audioCtx.onEnded(() => {
      this.next()
    })
    audioCtx.onCanplay(() => {
      console.log('onCanplay');
      this.setData({
        'play.duration': audioCtx.duration
      })
      if (this.data.state == 'running') {
        audioCtx.play()
      }
    })
    audioCtx.onTimeUpdate(() => {
      this.setData({
        'play.duration': audioCtx.duration,
        'play.currentTime': audioCtx.currentTime,
        'play.percent': audioCtx.currentTime / audioCtx.duration
      })
    })
  },
  chageItem(e) {
    console.log(e);
    this.setData({
      item: e.currentTarget.dataset.item
    })
  },
  changeTab(e) {
    console.log(e);
    this.setData({
      tab: e.detail.current
    })
  },
  selectMusic(index) {
    console.log('change');
    let music = this.data.musiclist[index];
    console.log(music);
    audioCtx.src = music.src
    this.setData({
      playIndex: index,
      play: music,
      'play.currentTime': 0,
      'play.duration': 0,
      'play.percent': 0
    })
  },
  play() {
    audioCtx.play()
    this.setData({
      state: 'running'
    })
  },
  pause() {
    audioCtx.pause()
    this.setData({
      state: 'paused'
    })
  },
  next() {
    let index = this.data.playIndex >= this.data.musiclist.length - 1 ? 0 : this.data.playIndex + 1
    this.selectMusic(index)
    if (this.data.state == 'running') {
      this.play()
    }
  },
  change(e) {
    console.log(e);
    this.selectMusic(e.currentTarget.dataset.index)
    this.play()
  }
})