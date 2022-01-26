//服务器路口文件
//1.创建koa实例对象
const Koa = require('koa')

const app = new Koa()
    //2.绑定中间件
const respDuratioMiddleware = require('./middleware/koa_response_duration')
    //第一层中间件
app.use(respDuratioMiddleware)
    //第二层中间件
const respHeaderMiddleware = require('./middleware/koa_response_header')
app.use(respHeaderMiddleware)
    //第三层中间件
const respDataMiddleware = require('./middleware/koa_response_data')
app.use(respDataMiddleware)
    //3.绑定端口号8888
app.listen(8888)