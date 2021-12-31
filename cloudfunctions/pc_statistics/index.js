// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-7g245pll714f761e'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const directionCollection = db.collection('directions')
  const $ = db.command.aggregate

  let directions = await directionCollection.where({}).get()
  let res = await db.collection('student').aggregate()
    .unwind({
      path: '$choosen',
      includeArrayIndex: 'index'
    })
    .project({
      name: 1,
      index: 1,
      score: 1,
      sn: 1,
      choosen: 1
    })
    .sort({
      choosen: 1,
      index: 1,
      score: -1
    })
    .group({
      _id: '$choosen',
      students: $.push({
        index: '$index',
        score: '$score',
        name: '$name',
        sn: '$sn'
      })
    })
    .unwind({
      path: '$students',
      includeArrayIndex: 'rank' //分专业方向的排名
    })
    .project({
      _id: 0,
      choosen: '$_id',
      rank: $.add(['$rank', 1]),
      index: '$students.index',
      score: '$students.score',
      name: '$students.name',
      sn: '$students.sn'
    })
    .sort({
      choosen: 1,
      index: 1,
      rank: 1
    })
    .limit(1000)
    .end()

  console.log('long aggregate', res);
  let list = res.list
  for (let pid = 0; pid < directions.data.length; pid++) {
    let ll = list.slice(0)
    console.log('pid', pid);
    for (let i = 0; i < list.length; i++) {
      // 专业方向的限额
      let num = directions.data.find(v => {
        return v.name == list[i].choosen
      }).num
      // 如果这位同学排名在本方向的限额内，那就把其他志愿删掉
      if (list[i].index == pid && list[i].rank <= num) {
        ll = ll.filter(v => {
          return !(v.name == list[i].name && v.index != pid)
        })
      }
    }
    // 重排序
    let o = {}
    ll.forEach(v => {
      o[v.choosen] = o[v.choosen] ? o[v.choosen] + 1 : 1
      v.rank = o[v.choosen]
    })
    list = ll.slice(0)
  }
  console.log('statistics',list);


  return {
    list
  }
}