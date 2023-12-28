const mysql = require('mysql')

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin123',
  database: 'my_db01',
  timezone: '08:00', // 解决时区问题
})

module.exports = db
