
// swagger在线网站：https://editor.swagger.io/#

const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const path = require('path')

const swaggerInit = (app, baseUrl) => {
  //options是swaggerJSDoc的配置项
  const options = {
    swagger: '2.0',
    //definition是swagger的配置项
    definition: {
      info: {
        title: 'Node Swagger API',
        version: '1.0.0',
        description: 'Demonstrating how to describe a RESTful API with Swagger',
      },
    },
    // 重点，指定 swagger-jsdoc 去哪个路由下收集 swagger 注释
    apis: [path.join(process.cwd(), '/router/*.js')],
  }
  const swaggerSpec = swaggerJSDoc(options)

  // 可以访问 xxx/swagger.json 看到生成的swaggerJSDoc
  app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })

  // 可以访问 xxx/api-docs 看到生成的swagger接口文档
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

module.exports = swaggerInit