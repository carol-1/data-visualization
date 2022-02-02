<template>
  <div class="com-page">
    <div class="com-chart" ref="rank_ref"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      startValue: 0, //区域缩放的起点值
      endValue: 9, //区域缩放的终点值
      timerId: null, //定时器的标识
    };
  },
  mounted() {
    this.initChart();
    this.getData();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destoryed() {
    window.removeEventListener("resize", this.screenAdapter);
    clearInterval(this.timerId);
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.rank_ref, "chalk");
      const initOption = {
        title: {
          text: "地区销售排行",
          left: 20,
          top: 20,
        },
        grid: {
          left: "5%",
          top: "40%",
          right: "5%",
          bottom: "5%",
          containLabel: true,
        },
        tooltip: {
          show: true,
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "bar",
          },
        ],
      };
      this.chartInstance.setOption(initOption);
      this.chartInstance.on("mouseover", () => {
        clearInterval(this.timerId);
      });
      this.chartInstance.on("mouseout", () => {
        this.startInterval();
      });
    },
    async getData() {
      const { data: ret } = await this.$http.get("rank");
      this.allData = ret;
      this.allData.sort((a, b) => {
        return b.value - a.value;
      });
      this.updateChart();
      this.startInterval();
    },
    updateChart() {
      const colorArr = [
        ["#0BA82C", "#4FF778"],
        ["#2E72BF", "#23E5E5"],
        ["#5052EE", "#AB6EE5"],
      ];
      //所有省份形成的数组
      const provinceArr = this.allData.map((item) => {
        return item.name;
      });
      //所有省份形成的销售金额

      const valueArr = this.allData.map((item) => {
        return item.value;
      });
      const adapterOption = {
        xAxis: {
          data: provinceArr,
        },
        dataZoom: {
          show: true,
          startValue: this.startValue,
          endValue: this.endValue,
        },
        series: {
          data: valueArr,
          itemStyle: {
            color: (arg) => {
              let targetColorArr = null;
              if (arg.value > 300) {
                targetColorArr = colorArr[0];
              } else if (arg.value > 200) {
                targetColorArr = colorArr[1];
              } else {
                targetColorArr = colorArr[2];
              }
              return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: targetColorArr[0],
                },
                {
                  offset: 1,
                  color: targetColorArr[1],
                },
              ]);
            },
          },
        },
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.rank_ref.offsetWidth / 100) * 3.6;
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        series: [
          {
            barWidth: titleFontSize,
            itemStyle: {
              barBorderRadius: [titleFontSize / 2, titleFontSize / 2, 0, 0],
            },
          },
        ],
      }
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    startInterval() {
      if (this.timerId) {
        clearInterval(this.timerId);
      }
      this.timerId = setInterval(() => {
        this.startValue++;
        this.endValue++;
        if (this.endValue > this.allData.length - 1) {
          this.startValue = 0;
          this.endValue = 9;
        }
        this.updateChart();
      }, 2000);
    },
  },
};
</script>

<style>
</style>