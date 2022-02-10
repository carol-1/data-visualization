# data-visualization
这是一个学习黑马的电商平台的数据可视化实时监控系统，Echarts-vue项目，通过本次项目对echarts和vue框架的具体应用有了更加深刻的了解

技术选型：
echarts,
Vue vue Router Vuex
webpack
Axios
WebSocket

需求分析：
1.该项目为电商平台数据可视化实时监控系统
2.可以保证实时获取数据进行分析
3.支持大屏展示，自适应分辨率
4.支持联动效果（没有实现）

技术选型：
echarts,
Vue vue Router Vuex
webpack
Axios
WebSocket

1后台项目Koa_server文件夹
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

2前端项目vision文件夹
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
    

3.单独图表组件的开发
    商家销售统计（横向柱状图）
         组件结构的设计 SellerPage是测试使用的
         布局结构的设计
         图表基本功能实现：
                      一般步骤：initChart初始化图表,getData获取服务器的数据,updateChart更新图表
         数据从小到大排序，然后每5个元素显示一页
         动态刷新的实现：
        UI调整：主题的使用init，图表的圆角canvas，图表的标题title，坐标轴的位置grid，柱状图条目
        拆分图表的option：初始化配置initOption,获取数据之后得配置dataOption,分辨率适配得配置adapterOption
        分辨率适配：监听窗口大小
          
    销量趋势图表（折线图）：
        通用代码结构和流程：组件的结构，代码流程结构
        图表基本功能：数据的获取，数据的处理（散点数据和图例数据），图表的设置
        UI调整：主题的使用，标题的显示
       切换图表：
       分辨率适配：标题文字大小，图例大小



    商家分布模块（地图+散点图）
        通用代码结构和流程：组件的结构，代码流程结构
        显示地图：获取中国地图的矢量数据，注册地图数据，配置geo
      图表基本功能：数据的获取，数据的处理（散点数据和图例数据），图表的设置
        UI调整：主题的使用，标题的显示，地图位置和颜色，图例的位置和方向，涟漪效果
       地图点击事件：点击事件的监听，获取所点击省份的矢量地图数据，显示省份，回到中国地图
       分辨率适配：标题文字大小，图例大小
        
    销量排行模块（柱状图）：
       通用代码结构和流程：组件的结构（RankPage,Rank），代码流程结构：初始化图表对象，获取数据，处理数据更新图表，分辨率适配
       图表基本功能的实现：：数据的获取，数据的处理，图表的设置
       UI调整：
       平移动画的实现：
       分辨率适配：

    热销商品占比模块（饼图）
       通用代码结构和流程：
       图表基本功能的实现：
       UI调整：
       平移动画的实现：
       分辨率适配：

    库存与销量模块（圆环饼图）：
       通用代码结构和流程：
       图表基本功能的实现：
       UI调整：
       平移动画的实现：
       分辨率适配：

webSocket引入：
    WebSocket的基本使用：
    后端：
          安装包：npm i ws -s
          创建对象：  
          监听事件：连接事件+接收数据事件
          发送数据：
   前端：
           创建对象
           监听事件：连接成功事件，接收数据事件，关闭连接事件
           发送数据
      WebSocket的改造项目：
    后端：
          创建对象：  
          服务端接收数据字段约定
          服务端发送数据字段约定：
   前端：
           创建对象
           监听事件：连接成功事件，接收数据事件，关闭连接事件
           发送数据
细节处理

