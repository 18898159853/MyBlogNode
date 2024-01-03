// 导入 express
const express = require('express')
const artcate_handler = require('../router_handler/artcatelist')
// 创建路由对象
const router = express.Router()
// 获取文章列表
router.post(
  '/getArtCateList',
  artcate_handler.getArtCateList
)
// 获取文章信息
router.get(
  '/getArtCate/:id',
  artcate_handler.getArtCate
)
// 添加文章
router.post(
  '/addArtCateList',
  artcate_handler.addArtCateList
)
//删除文章
router.post(
  '/delArtCate/:id',
  artcate_handler.delArtCate
)
//修改文章
router.post(
  '/editArtCate',
  artcate_handler.editArtCate
)

// 向外共享路由对象
module.exports = router
