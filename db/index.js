const mysql = require('mysql')

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root', // 数据库名称
  password: 'admin123', // 数据库密码
  database: 'my_db01', // 数据库名称
  timezone: '08:00', // 解决时区问题
})

module.exports = db
