// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-7g245pll714f761e'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  const studentCollection = db.collection('student')
  let choosen = event.user.choosen
  let _id = event.user._id
  let res = await studentCollection.where({
    _id
  }).update({
    data: {
      choosen
    }
  })
  return {
    res
  }
}