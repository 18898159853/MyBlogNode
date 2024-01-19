// 导入数据库操作模块
const db = require('../db/index')
// 随拍列表
exports.somePhotolist = (req, res) => {
  const sql = 'select * from ev_somephoto '
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取成功',
      data: results,
    })
  })
}
// 添加随拍
exports.addsomePhoto = (req, res) => {
  const info = req.body
  const sql = 'insert into ev_somephoto set ? '
  db.query(sql, info, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '添加成功',
    })
  })
}
// 编辑随拍
exports.editsomePhoto = (req, res) => {
  const info = req.body
  const sql = 'update ev_somephoto set ? where id=? '
  db.query(sql, [info, info.id], (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '修改成功',
    })
  })
}
//删除随拍
exports.delsomePhoto = (req, res) => {
  const id = req.params.id
  const sql = 'delete from ev_somephoto where id = ? '
  db.query(sql, [id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除失败')
    res.send({
      status: 0,
      message: '删除成功',
    })
  })
}