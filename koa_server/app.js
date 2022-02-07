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

const WebSocketServer = require('./service/web_socket_service')
    //当开启服务器后，监听客户端的连接
    //当某一个客户端连接成功后，就会对这个客户端进行Message事件监听
WebSocketServer.listen()