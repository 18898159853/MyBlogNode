// 导入 express
const express = require('express')
const userAccessInfo_handler = require('../router_handler/userAccessInfo')
// 创建路由对象
const router = express.Router()
// 获取访问用户信息数据
router.post('/nojwt/getUserAccessInfo', userAccessInfo_handler.getUserAccessInfo)
// 添加访问用户的信息
router.post('/nojwt/addUserAccessInfo', userAccessInfo_handler.addUserAccessInfo)

// 向外共享路由对象
module.exports = router
