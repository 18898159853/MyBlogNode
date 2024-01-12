// 导入数据库操作模块
const db = require('../db/index')
// 获取网站列表及分类
exports.getShareListserver = (req, res) => {
  const sql = 'select * from ev_share_cate';
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    const sql1 = 'select * from ev_share';
    db.query(sql1, (err, results1) => {
      results.forEach(element => {
        element.children = results1.filter(v => v.pid == element.id)
      });
      res.send({
        status: 0,
        message: '获取全部网站列表成功！',
        data: results
      })
    })
  })
}
// 网站列表
exports.sharelist = (req, res) => {
  const pid = req.body.pid;
  let sqlCount = `select count(*) as total from ev_share ` ; // 查询总数量
  if (pid) {
     sqlCount += ` where pid = ?` ; 
  }
  db.query(sqlCount,pid,(err, results0) => {
    if (err) return res.cc(err);
    const page = req.body.page;
    const size = req.body.size;
    let sql = 'select * from ev_share';
    let params = [];
    if (pid) {
      sql += ' where pid = ?';
      params.push(pid);
    }
    if (page && size) {
      sql += ' LIMIT ? OFFSET ?';
      params.push(Number(size), (page - 1) * size);
    }
    db.query(sql, params, (err, results) => {
      if (err) return res.cc(err);
      res.send({
        status: 0,
        message: '获取成功',
        data: results,
        total: results0[0].total,
      });
    });
  });
};
// 添加网站
exports.addshare = (req, res) => {
  const info = req.body
  const sql = 'insert into ev_share set ? '
  db.query(sql, info, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '添加成功',
    })
  })
}
// 编辑网站
exports.editshare = (req, res) => {
  const info = req.body
  const sql = 'update ev_share set ? where id=? '
  db.query(sql, [info, info.id], (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '修改成功',
    })
  })
}
//删除网站
exports.delshare = (req, res) => {
  const info = req.params
  const sql = 'delete from ev_share where id = ? '
  db.query(sql, [info.id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除失败')
    res.send({
      status: 0,
      message: '删除成功',
    })
  })
}
// 获取网站分类列表
exports.sharecatelist = (req, res) => {
  const sql = 'select * from ev_share_cate '
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取成功',
      data: results,
    })
  })
}
// 添加网站分类
exports.addsharecate = (req, res) => {
  const info = req.body
  const sql = 'insert into ev_share_cate set ? '
  db.query(sql, info, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '添加成功',
    })
  })
}
// 编辑网站分类
exports.editsharecate = (req, res) => {
  const info = req.body
  const sql = 'update ev_share_cate set ? where id=? '
  db.query(sql, [info, info.id], (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '修改成功',
    })
  })
}
//删除网站分类
exports.delsharecate = (req, res) => {
  const info = req.params
  const sql = 'delete from ev_share_cate where id = ? '
  db.query(sql, [info.id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除失败')
    res.send({
      status: 0,
      message: '删除成功',
    })
  })
}