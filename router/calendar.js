// 导入 express
const express = require('express')
const calendar_handler = require('../router_handler/calendar')
// 创建路由对象
const router = express.Router()
// 获取日历数据
router.post('/getcalendar', calendar_handler.calendarlist)
//添加日历数据
router.post('/addcalendar', calendar_handler.addcalendar)
// 编辑日历数据
router.post('/editcalendar', calendar_handler.editcalendar)
// 删除日历数据
router.post('/delcalendar', calendar_handler.delcalendar)

// 向外共享路由对象
module.exports = router
