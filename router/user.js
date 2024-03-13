const express = require('express')
const router = express.Router()
const multer = require("multer") 

// 导入用户路由处理函数对应的模块
const user_handler = require('../router_handler/user')

// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const {
  reg_login_schema,
  reg_delte_schema,
  reg_updatelist_schema,
  reg_add_schema,
} = require('../schema/user')

// 注册新用户
router.post('/reguser', expressJoi(reg_add_schema), user_handler.regUser)
// 登录
router.post('/login', expressJoi(reg_login_schema), user_handler.login)
router.post('/nojwt/getlist', user_handler.list)
router.post('/dellist', expressJoi(reg_delte_schema), user_handler.dellist)
router.post(
  '/editlist',
  expressJoi(reg_updatelist_schema),
  user_handler.updatelist
)
// 指定存储位置
const storage = multer.diskStorage({
  // 存储位置
  destination(req, file, callback) {
    // 参数一 错误信息   参数二  上传路径（此处指定img文件夹）
    callback(null, "img")
  },
  // 确定文件名
  filename(req, file, cb) {
    file.originalname=Buffer.from(file.originalname, "latin1").toString(
      "utf8"
  );
    cb(null,  file.originalname)
  }
})
/*
  multer是node的中间件, 处理表单数据 主要用于上传文件  multipart/form-data
*/
// 得到multer对象  传入storage对象
const upload = multer({ storage })

router.post('/upload', upload.single("file"), user_handler.upload)
module.exports = router
