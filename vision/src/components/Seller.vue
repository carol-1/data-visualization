<!-- 商家销量统计的横向柱状图 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="seller_ref"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartInstance: null,
      allData: null, //服务器返回的数据
      currentPage: 1, //当前显示得页数
      totalPage: 0, //一共有多少页
      timerId: null, //定时器得标识
    };
  },
  mounted() {
    this.initChart();
    this.getData();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  //这是生命周期得方法
  destroyed() {
    clearInterval(this.timerId);
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    //初始化echartInstance对象
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.seller_ref, "chalk");
      //对图表初始化进行配置的控制
      const initOption = {
        title: {
          text: "▎商家销售统计",

          left: 20,
          top: 20,
        },
        grid: {
          //配置坐标轴位置
          top: "20%",
          left: "3%",
          right: "6%",
          bottom: "3%",
          containLabel: true, //举例包含坐标轴上文字
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
        },
        //设置鼠标放上时得提示效果
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            z: 0, //配置层级
            lineStyle: {
              color: "#8f939c",
            },
          },
        },
        series: [
          {
            type: "bar",

            label: {
              //文字得显示
              show: true,
              position: "right",
              textStyle: {
                color: "white",
              },
            },
            itemStyle: {
              //指明线性渐变，方向，百分比
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                //百分之0下的颜色值
                {
                  offset: 0,
                  color: "#5052EE",
                },
                //百分之100下的颜色值
                {
                  offset: 1,
                  color: "#AB6EE5",
                },
              ]),
            },
          },
        ],
      };
      this.chartInstance.setOption(initOption);
      //对图表对象进行鼠标事件得监听
      this.chartInstance.on("mouseover", () => {
        clearInterval(this.timerId);
      });
      this.chartInstance.on("mouseout", () => {
        this.startInterval();
      });
    },
    //获取数据
    async getData() {
      const { data: ret } = await this.$http.get("seller"); //因为已经被挂载，所以vue上有这个路径
      this.allData = ret;
      this.allData.sort((a, b) => {
        return a.value - b.value; //从小到大排序
      });
      //每5个元素显示一页
      this.totalPage =
        this.allData.length % 5 === 0
          ? this.allData.length / 5
          : this.allData.lenght / 5 + 1;
      console.log(ret);
      this.updateChart();
      this.startInterval(); //启动定时器
    },
    //更新图表
    updateChart() {
      const start = (this.currentPage - 1) * 5;
      const end = this.currentPage * 5;
      const showData = this.allData.slice(start, end);
      const sellerNames = showData.map((item) => {
        return item.name;
      });
      const sellerValues = showData.map((item) => {
        return item.value;
      });
      const dataOption = {
        yAxis: {
          data: sellerNames,
        },

        series: [
          {
            data: sellerValues,
          },
        ],
      };

      this.chartInstance.setOption(dataOption);
    },
    startInterval() {
      //先判断这个定时器存不存在，存在则先清除定时器，再重新启动
      if (this.timerId != null) {
        clearInterval(this.timerId);
      }
      this.timerId = setInterval(() => {
        this.currentPage++;
        if (this.currentPage > this.totalPage) {
          this.currentPage = 1;
        }
        this.updateChart();
      }, 3000);
    },
    //当浏览器大小发生变化时调用的方法
    screenAdapter() {
      const titleFontSize = this.$refs.seller_ref.offsetWidth /40;
      console.log(titleFontSize);
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },

        //设置鼠标放上时得提示效果
        tooltip: {
          axisPointer: {
            lineStyle: {
              Width: titleFontSize,
            },
          },
        },
        series: [
          {
            barWidth: titleFontSize, //柱状图宽度

            itemStyle: {
              barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0],
            }
          }
        ]
      };
      this.chartInstance.setOption(adapterOption);
      //手动的调用图表对象的resize才能产生效果
      this.chartInstance.resize();
    }
  }
};
</script>

<style lang="less" scoped>
</style>
