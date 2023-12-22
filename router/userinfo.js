// 导入 express
const express = require('express')
// 创建路由对象
// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const {
  update_userinfo_schema,
  update_password_schema,
  update_avatar_schema,
} = require('../schema/user')
// 2. 导入需要的验证规则对象
const router = express.Router()
const userinfo_handler = require('../router_handler/userinfo')
// 获取用户的基本信息
router.get('/userinfo', userinfo_handler.getUserInfo)
// 更新用户信息的路由
router.post(
  '/userinfo',
  expressJoi(update_userinfo_schema),
  userinfo_handler.postUserInfo
)
// 重置密码的路由
router.post(
  '/updatepwd',
  expressJoi(update_password_schema),
  userinfo_handler.updatePassword
)
// 更新用户头像的路由
router.post(
  '/update/avatar',
  expressJoi(update_avatar_schema),
  userinfo_handler.updateAvatar
)

// 向外共享路由对象
module.exports = router
