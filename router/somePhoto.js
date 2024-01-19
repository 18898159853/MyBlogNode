// 导入 express
const express = require('express')
const somePhtoto_handler = require('../router_handler/somePhoto')
// 创建路由对象
const router = express.Router()
// 获取日历数据
router.post('/getsomePhtoto', somePhtoto_handler.somePhotolist)
//添加日历数据
router.post('/addsomePhtoto', somePhtoto_handler.addsomePhoto)
// 编辑日历数据
router.post('/editsomePhtoto', somePhtoto_handler.editsomePhoto)
// 删除日历数据
router.post('/delsomePhtoto/:id', somePhtoto_handler.delsomePhoto)

// 向外共享路由对象
module.exports = router
