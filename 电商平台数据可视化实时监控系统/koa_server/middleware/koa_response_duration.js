//计算服务器消耗时长的中间件
//必须位于第一层中间件，一进入服务器时间和结束时间之差，设置响应头
//module.exports导出中间件函数
module.exports = async(ctx, next) => {
    //开始时间
    const start = Date.now()
        //内层中间件得到执行
    await next()
        //结束时间
    const end = Date.now()
        //设置响应头
    const duration = end - start
    ctx.set('X-Response-Time', duration + 'ms')


}