// 导入 express
const express = require('express')
const share_handler = require('../router_handler/share')
// 创建路由对象
const router = express.Router()
// 前台获取全部网站数据
router.get('/getShareListserver', share_handler.getShareListserver)
// 获取网站数据
router.post('/getshare', share_handler.sharelist)
//添加网站数据
router.post('/addshare', share_handler.addshare)
// 编辑网站数据
router.post('/editshare', share_handler.editshare)
// 删除网站数据
router.post('/delshare/:id', share_handler.delshare)
// 获取网站分类数据
router.get('/getsharecate', share_handler.sharecatelist)
// 添加网站分类数据
router.post('/addsharecate', share_handler.addsharecate)
// 编辑网站分类数据
router.post('/editsharecate', share_handler.editsharecate)
// 删除网站分类数据
router.post('/delsharecate/:id', share_handler.delsharecate)

// 向外共享路由对象
module.exports = router
