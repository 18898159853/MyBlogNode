// 导入数据库操作模块
const db = require('../db/index')
// 获取访问用户信息数据
exports.getUserAccessInfo = (req, res) => {
  let sqlCount = `select count(*) as total from ev_useraccessinfo ` ; // 查询总数量
  db.query(sqlCount,(err, results0) => {
    if (err) return res.cc(err);
    const page = req.body.currentPage;
    const size = req.body.pageSize;
    let sql = 'select * from ev_useraccessinfo order by accesstime desc';
    let params = [];
    if (page && size) {
      sql += ' LIMIT ? OFFSET ?';
      params.push(Number(size), (page - 1) * size);
    }
    db.query(sql, params, (err, results) => {
      if (err) return res.cc(err);
      res.send({
        status: 0,
        message: '获取用户信息列表成功！',
        data: results,
        total: results0[0].total,
      });
    });
  });
 
}
// 添加访问用户的信息
exports.addUserAccessInfo = (req, res) => {
  const info = req.body;
  const sqlip = 'SELECT * FROM ev_useraccessinfo WHERE ip = ?';
  db.query(sqlip, info.ip, (err, results) => {
    if (err) return res.cc(err);
    const canInsert = results.length === 0 || isAccessTimeExpired(results);
    if (canInsert) {
      const sql = 'INSERT INTO ev_useraccessinfo SET ?';
      db.query(sql, info, (err, insertResults) => {
        if (err) return res.status(500).send(err);
        return res.send({ status: 0, message: '添加成功' });
      });
    } else {
      return res.send({ status: 1, message: '失败' });
    }
  });
};
// 判断最后一次访问时间距离当前时间是否超过1小时 防止重复请求
function isAccessTimeExpired(results) {
  const latestItem = results.reduce((latest, item) => {
    if (new Date(item.accesstime) > new Date(latest.accesstime)) {
      return item;
    } else {
      return latest;
    }
  }, results[0]);
  const currentTime = new Date().getTime();
  const timestamp = Math.floor(new Date(latestItem.accesstime).getTime());
  return timestamp + 1000 * 60 * 60 * 1 < currentTime;
}
