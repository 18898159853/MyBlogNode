// 导入数据库操作模块
const db = require('../db/index')
// 导入 bcryptjs 这个包 加密密码
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
// 注册新用户的处理函数
exports.regUser = (req, res) => {
  // 获取客户端提交到服务器的用户信息
  const userinfo = req.body
  // console.log(userinfo)
  // 对表单中的数据，进行合法性的校验
  if (!userinfo.username || !userinfo.password) {
    return res.send({ status: 1, message: '用户名或密码不合法！' })
  }

  // 定义 SQL 语句，查询用户名是否被占用
  const sqlStr = 'select * from ev_users where username=?'
  db.query(sqlStr, userinfo.username, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 判断用户名是否被占用
    if (results.length > 0) return res.cc('用户名被占用，请更换其他用户名！')
    // 调用 bcrypt.hashSync() 对密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    // 定义插入新用户的 SQL 语句
    const sql = 'insert into ev_users set ?'
    // 调用 db.query() 执行 SQL 语句
    db.query(sql, [userinfo], (err, results) => {
      // 判断 SQL 语句是否执行成功
      if (err) return res.cc(err)
      // 判断影响行数是否为 1
      if (results.affectedRows !== 1)
        return res.cc('注册用户失败，请稍后再试！')
      // 注册用户成功
      res.cc('注册成功！', 0)
    })
  })
}
// 登录的处理函数
exports.login = (req, res) => {
  const userinfo = req.body
  const sql = 'select * from ev_users where username=? '
  db.query(sql, userinfo.username, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('登录失败！账号错误')
    // bcrypt.compareSync 检测密码是否和存储的一致 true 密码一致 false 密码不一致
    const compareResult = bcrypt.compareSync(
      userinfo.password,
      results[0].password
    )
    if (!compareResult) return res.cc('登录密码错误！')
    // 用户信息
    const user = { ...results[0], password: '', user_pic: '' }
    // jwt.sign("信息"，密钥，{有效期})
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn, // token 有效期为 10 个小时
    })
    // 登录成功
    res.send({
      status: 0,
      message: '登录成功！',
      // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
      token: 'Bearer ' + tokenStr,
    })
  })
}
// 获取用户列表
exports.list = (req, res) => {
  const message = req.body.message || ' '
  const pageSize = req.body.pageSize
  const currentPage = req.body.currentPage
  if (message !== '' && message !== null && message !== ' ') {
    const sql =
      'select * from ev_users where  username like ? or nickname like ? or email like ?' // 模糊查询
    const values = ['%' + message + '%']
    db.query(sql, [values, values, values], (err, results) => {
      if (err) return res.cc(err)
      res.send({
        status: 0,
        message: '获取成功',
        data: results,
      })
    })
  } else {
    const sql = 'select count(*) as total from ev_users' // 查询总数量
    db.query(sql, (err, results) => {
      if (err) return res.cc(err)
      const sql1 = 'select * from ev_users LIMIT ? OFFSET ?' // 查询分页数据
      db.query(
        sql1,
        [Number(pageSize), (currentPage - 1) * pageSize],
        (err, results1) => {
          if (err) return res.cc(err)
          res.send({
            status: 0,
            message: '获取成功',
            data: results1,
            total: results[0].total, //总数据量
          })
        }
      )
    })
  }
}

//删除用户
exports.dellist = (req, res) => {
  const id = req.body.id
  const sql = 'delete from ev_users where id = ? '
  db.query(sql, [id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除失败')
    res.send({
      status: 0,
      message: '删除成功',
    })
  })
}
// 修改用户信息
exports.updatelist = (req, res) => {
  const userinfo = req.body
  console.log(userinfo)
  const sql = 'update ev_users set ? where id=? '
  db.query(sql, [userinfo, userinfo.id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('修改失败')
    res.send({
      status: 0,
      message: '修改成功',
    })
  })
}

// 日历的
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

//删除用户
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
