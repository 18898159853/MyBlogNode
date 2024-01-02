const db = require('../db/index')
// 获取文章列表
exports.getArtCateList = (req, res) => {
  const sql = 'select * from ev_articlelist '
  db.query(sql, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 2. 执行 SQL 语句成功
    res.send({
      status: 0,
      message: '获取文章列表成功！',
      data: results,
    })
  })
}
// 根据id获取文章
exports.getArtCate = (req, res) => {
  const sql = 'select * from ev_articlelist  where id = ?'
  db.query(sql,req.params.id,(err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 2. 执行 SQL 语句成功
    res.send({
      status: 0,
      message: '获取文章成功！',
      data: results[0],
    })
  })
}
// 添加文章
exports.addArtCateList =(req,res)=>{
  const sql = 'insert into ev_articlelist set ?  '
  const info = req.body
  db.query(sql, [info], (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 2. 执行 SQL 语句成功
    res.cc('添加文章成功！', 0)
  })
}
// 删除文章
exports.delArtCate =(req,res)=>{
  const sql = 'delete from ev_articlelist where id = ?'
  const info = req.params
  console.log(info);
  db.query(sql, [info.id], (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 2. 执行 SQL 语句成功
    res.send({
      status: 0,
      message: '删除文章成功！',
    })
  })
}