Page({
    data:{
        markers:[{
            iconPath:"../images/mark.png",
            id:0,
            latutude:23.3882,
            longitude:113.4490,
            title:'图文楼'
        }],
        height:0
    },
    onLoad(){
        let screenHeight = wx.getSystemInfoSync().windowHeight;
        this.setData({
            height:screenHeight - 200
        })
    }
})