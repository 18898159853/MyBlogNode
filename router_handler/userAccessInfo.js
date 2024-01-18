// 导入数据库操作模块
const e = require('express');
const db = require('../db/index')
// 获取访问用户信息数据
exports.getUserAccessInfo = (req, res) => {
  const sql = 'select * from ev_useraccessinfo order by accesstime desc';
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
      res.send({
        status: 0,
        message: '获取全部用户信息列表成功！',
        data: results
      })
  })
}
// 添加访问用户的信息
exports.addUserAccessInfo = (req, res) => {
  const info = req.body
  const sqlip = 'select * from ev_useraccessinfo where ip=?'
  db.query(sqlip, info.ip, (err, results) => {
    if (err) return res.cc(err)
    const latestItem = results.reduce((latest, item) => {  
      if (new Date(item.accesstime) > new Date(latest.accesstime)) {  
          return item;  
      } else {  
          return latest;  
      }  
    }, results[0]); // 初始值设为数组的第一个元素，确保第一次比较就会返回正确的最大值
    let currentTime = new Date().getTime(); //当前时间
    const dateObject = new Date(latestItem.accesstime);  
    const timestamp = Math.floor(dateObject.getTime()); // 当前ip最新存储时间
    if (timestamp+1000*60*60*1<currentTime) {
      const sql = 'insert into ev_useraccessinfo set ? '
      db.query(sql, info, (err, results) => {
        if (err) return res.cc(err)
        res.send({
          status: 0,
          message: '添加成功',
        })
      })
    }else{
      res.send({
        status: 1,
        message: '失败',
      })
    }
  })
}