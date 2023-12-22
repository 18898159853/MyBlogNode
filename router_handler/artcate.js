// 导入数据库操作模块
const db = require('../db/index')
// 获取文章分类列表
exports.getArticleCates = (req, res) => {
  const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'
  db.query(sql, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 2. 执行 SQL 语句成功
    res.send({
      status: 0,
      message: '获取文章分类列表成功！',
      data: results,
    })
  })
}
// 添加文章分类
exports.addArticleCate = (req, res) => {
  const sql = `select * from ev_article_cate where name=? or alias=?`
  db.query(sql, [req.body.name, req.body.alias], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)

    // 判断 分类名称 和 分类别名 是否被占用
    if (results.length === 2)
      return res.cc('分类名称与别名被占用，请更换后重试！')
    // 分别判断 分类名称 和 分类别名 是否被占用
    if (results.length === 1 && results[0].name === req.body.name)
      return res.cc('分类名称被占用，请更换后重试！')
    if (results.length === 1 && results[0].alias === req.body.alias)
      return res.cc('分类别名被占用，请更换后重试！')

    // TODO：新增文章分类
    const sql = 'insert into ev_article_cate set ?  '
    const info = req.body
    db.query(sql, [info], (err, results) => {
      // 1. 执行 SQL 语句失败
      if (err) return res.cc(err)
      // 2. 执行 SQL 语句成功
      res.cc('添加文章分类成功！', 0)
    })
  })
}
// 编辑文章分类
exports.editArticleCate = (req, res) => {
  const sql = `select * from ev_article_cate where id<>? and (name=? or alias=?)`
  // 执行查重操作
  db.query(
    sql,
    [req.body.id, req.body.name, req.body.alias],
    (err, results) => {
      // 执行 SQL 语句失败
      if (err) return res.cc(err)
      // 判断 分类名称 和 分类别名 是否被占用
      if (results.length === 2)
        return res.cc('分类名称与别名被占用，请更换后重试！')
      if (results.length === 1 && results[0].name === req.body.name)
        return res.cc('分类名称被占用，请更换后重试！')
      if (results.length === 1 && results[0].alias === req.body.alias)
        return res.cc('分类别名被占用，请更换后重试！')
      const sql = `update ev_article_cate set ? where id=?`
      db.query(sql, [req.body, req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')
        // 更新文章分类成功
        res.cc('更新文章分类成功！', 0)
      })
    }
  )
}
// 删除文章分类
exports.delArticleCate = (req, res) => {
  const sql = 'update ev_article_cate set is_delete=1 where id=?'
  const info = req.params
  db.query(sql, [info.id], (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 2. 执行 SQL 语句成功
    res.send({
      status: 0,
      message: '删除文章分类成功！',
    })
  })
}
