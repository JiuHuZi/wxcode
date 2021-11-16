let ctx = wx.createCanvasContext('myCanvas')
Page({
    data: {
        mosaic: true,
        imagePath: '',
    },
    open() {
        wx.chooseImage({
            count: 1,
        }).then(res => {
            console.log(res);
            let file = res.tempFilePaths[0]
            ctx.drawImage(file, 0, 0, 240, 380)
            ctx.draw()
        })
    },
    clear() {
        this.setData({
            mosaic: false
        })
    },
    mosaic() {
        this.setData({
            mosaic: true
        })
    },
    move(e) {
        console.log(e);
        if (this.data.mosaic) {
            ctx.setFillStyle('red')
            ctx.fillRect(e.touches[0].x, e.touches[0].y, 10, 10)
            ctx.fillRect(e.touches[0].x + 10, e.touches[0].y + 10, 10, 10)
            ctx.setFillStyle('blue')
            ctx.fillRect(e.touches[0].x + 10, e.touches[0].y, 10, 10)
            ctx.fillRect(e.touches[0].x, e.touches[0].y + 10, 10, 10)
        } else {
            ctx.clearRect(e.touches[0].x, e.touches[0].y, 20, 20)
        }
        ctx.draw(true)
    },
    save() {
        wx.canvasToTempFilePath({
            canvasId: 'myCanvas',
        }).then(res => {
            console.log('savefile:', res);
            this.setData({
                imagePath: res.tempFilePath
            })
        })
    },
    seal() {
        ctx.setFillStyle('red')
        ctx.setFontSize(36)
        ctx.fillText('07200903陈健生', 0, 200)
        ctx.draw(true)
    }
})