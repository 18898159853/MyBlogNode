// 导入数据库操作模块
const db = require('../db/index')
// 日历列表
exports.calendarlist = (req, res) => {
  const sql = 'select * from ev_calendar '
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取成功',
      data: results,
    })
  })
}
// 添加日历
exports.addcalendar = (req, res) => {
  const info = req.body
  const sql = 'insert into ev_calendar set ? '
  db.query(sql, info, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '添加成功',
    })
  })
}
// 编辑日历
exports.editcalendar = (req, res) => {
  const info = req.body
  const sql = 'update ev_calendar set ? where id=? '
  db.query(sql, [info, info.id], (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '修改成功',
    })
  })
}
//删除日历
exports.delcalendar = (req, res) => {
  const id = req.body.id
  const sql = 'delete from ev_calendar where id = ? '
  db.query(sql, [id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除失败')
    res.send({
      status: 0,
      message: '删除成功',
    })
  })
}