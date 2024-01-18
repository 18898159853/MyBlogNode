// 导入 express
const express = require('express')
// 创建服务器的实例对象
const app = express()
const joi = require('@hapi/joi')
// 导入并配置 cors 中间件
const cors = require('cors')
const path = require('path');
// 配置解析传输大小的中间件
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ limit: '50mb' ,extended: true}))
app.use(cors())
// 配置解析表单数据的中间件，注意：这个中间件，只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))
// 一定要在路由之前，封装 res.cc 函数
app.use((req, res, next) => {
  // status 默认值为 1，表示失败的情况
  // err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})
// 一定要在路由之前配置解析 Token 的中间件
const expressJWT = require('express-jwt')
const config = require('./config')
app.use(
  expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/,'/my/article/cates','/ip'] })
)
// 部署静态资源, 部署之后即可通过域名访问文件
app.use(express.static("upload"))

// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 导入并使用用户信息路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

// 导入并使用文章分类路由模块
const artCateRouter = require('./router/artcate')
app.use('/my/article', artCateRouter)

// 导入并使用文章列表路由模块
const artListCateRouter = require('./router/artcatelist')
app.use('/api', artListCateRouter)

// 导入日历路由模块
const calendarCateRouter = require('./router/calendar')
app.use('/api', calendarCateRouter)

// 导入网站分享路由模块
const shareCateRouter = require('./router/share')
app.use('/api', shareCateRouter)
// app.set('trust proxy', true);// 设置以后，req.ips是ip数组；如果未经过代理，则为[]. 若不设置，则req.ips恒为[]
app.get('/ip', function(req, res){
  let ip = req.headers['x-forwarded-for'] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  Requereqst.connection.socket.remoteAddress;
  res.send({
    ip: ip
  });
});
// 导入访问用户的信息
const userInfoRouter = require('./router/userAccessInfo')
app.use('/api', userInfoRouter)

// 访问图片资源
app.use('/api', express.static(path.join(__dirname, 'img')));
// 定义错误级别的中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err)
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  // 未知的错误
  res.cc(err)
})

// 启动服务器
app.listen(3007, () => {
  console.log('api server running at http://127.0.0.1:3007')
})
