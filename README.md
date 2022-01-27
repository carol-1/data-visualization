# data-visualization
这是一个学习黑马的电商平台的数据可视化实时监控系统，Echarts-vue项目
需求分析：
1.该项目为电商平台数据可视化实时监控系统
2.可以保证实时获取数据进行分析
3.支持大屏展示，自适应分辨率
4.支持联动效果

技术选型：
echarts,
Vue vue Router Vuex
webpack
Axios
WebSocket

1后台项目
目标：
    计算服务器处理请求的总耗时
    在响应头上加上响应内容的mime类型
    根据URL读取指定目录下的文件内容，因为没有用数据库，将信息存在json文件中
步骤：
    项目准备-文件目录
    总耗时中间件
    响应头中间件
    业务逻辑中间件
    允许跨域：实际通过Ajax访问器，同源策略（当前页面的地址和Ajax获取数据的地址）

2前端项目
前端项目准备
  步骤：
     vue-cli搭建项目 npm install @vue/cli -g安装脚手架 项目地址：http://localhost:8081  npm run serve允许Vue
     删除无关代码
    项目基本配置：端口配置，自动打开浏览器，全局echarts对象的挂载,index.html中引入echarts文件
    axios的封装与挂载 npm install axios安装，  
// 将axios挂载到Vue的原型对象上
    // 在别的组件中 this.$http
Vue.prototype.$http = axios

// 将全局的echarts对象挂载到Vue的原型对象上
// 别的组件中 this.$echarts
Vue.prototype.$echarts = window.echarts
 在Vue中，我们不用获取dom节点，元素绑定ref之后，直接通过this.$refs即可调用，这样可以减少获取dom节点的消耗。
