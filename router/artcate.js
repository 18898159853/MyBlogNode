// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const artcate_handler = require('../router_handler/artcate')
const {
  reg_artacte_schema,
  reg_editartacte_schema,
  reg_delartacte_schema,
} = require('../schema/user')
// 获取文章分类的列表数据
router.get('/cates', artcate_handler.getArticleCates)
router.post(
  '/addcate',
  expressJoi(reg_artacte_schema),
  artcate_handler.addArticleCate
)
router.post(
  '/editcate',
  expressJoi(reg_editartacte_schema),
  artcate_handler.editArticleCate
)
router.get(
  '/delcate/:id',
  expressJoi(reg_delartacte_schema),
  artcate_handler.delArticleCate
)

// 向外共享路由对象
module.exports = router
