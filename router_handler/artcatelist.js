const db = require('../db/index')
// 获取文章列表
exports.getArtCateList = (req, res) => {
  const pageSize = req.body.pageSize // 获取每页显示多少条数据
  const currentPage = req.body.currentPage // 获取当前第几页
  const classify = req.body.classify // 文章分类
  let sql = 'select count(*) as total from ev_articlelist' // 查询总数量
  if (classify) {
    sql += ` where classify='${classify}'`
  }
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    let sql = 'select * from ev_articlelist '
    let params = []
    if (classify) {
      sql += ` where classify='${classify}'`
    }
    if (pageSize&&currentPage) {
      sql += ` order by id desc  LIMIT ? OFFSET ?`
      params.push(Number(pageSize), (currentPage - 1) * pageSize)
    }
    db.query(sql, params,(err, results1) => {
      if (err) return res.cc(err)
      res.send({
        status: 0,
        message: '获取文章列表成功！',
        data: results1,
        total: results[0].total, // 总条数
      })
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
// 修改文章
exports.editArtCate =(req,res)=>{
  const sql = 'update ev_articlelist set ? where id = ?'
  db.query(sql,  [req.body, req.body.id], (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 2. 执行 SQL 语句成功
    res.send({
      status: 0,
      message: '修改文章成功！',
    })
  })
}