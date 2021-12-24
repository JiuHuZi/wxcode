// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-7g245pll714f761e'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const pics = db.collection('pics')
  const votes = db.collection('votes')
  const $ = db.command.aggregate

  let res = await pics.get()
  console.log('pics', res)
  let plist = res.data

  res = await votes.aggregate()
                   .group({
                     _id:'$fileid',
                     count:$.sum(1)
                   })
                   .end()
  console.log(res);
  const vlist = res.list

  plist.map(v=>{
    let found = vlist.find(vv=>{
      return vv._id == v.fileid
    })
    if(found){
      v.count = found.count
    }else{
      v.count = 0
    }
  })

  return {
    plist
  }
}