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
  let openid = wxContext.OPENID
  let res = await studentCollection.where({
    openid
  }).get()

  console.log(res);
  if (res.data.length > 0) {
    result = res.data[0]
  } else {
    result = {
      name: 'nobody'
    }
  }

  return {
    result
  }
}