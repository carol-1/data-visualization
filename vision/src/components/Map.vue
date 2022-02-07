<!-- 商家分布图表 -->
<template>
  <div class="com-container" @dblclick="revertMap">
    <div class="com-chart" ref="map_ref"></div>
  </div>
</template>

<script>
import axios from "axios";
import { getProvinceMapInfo } from "@/utils/map_utils.js";
export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      mapData: {}, // 所获取的省份的地图矢量数据
      boolean:false//判断是在国家地图上点击还是省份地图
    };
  },
  created() {
    // 在组件创建完成之后 进行回调函数的注册
    this.$socket.registerCallBack("mapData", this.getData);
  },
  mounted() {
    this.initChart();
    // this.getData()
    // 发送数据给服务器, 告诉服务器, 我现在需要数据
    this.$socket.send({
      action: "getData",
      socketType: "mapData",
      chartName: "map",
      value: "",
    });
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
   destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
    // 在组件销毁的时候, 进行回调函数的取消
    this.$socket.unRegisterCallBack("mapData");
  },
  methods: {
    async initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref, this.theme);
      // 获取中国地图的矢量数据
      // http://localhost:9000/static/map/china.json
      // 由于我们现在获取的地图矢量数据并不是位于KOA2的后台, 所以咱们不能使用this.$http
      const ret = await axios.get(
        "http://localhost:9000/static/map/china.json"
      );
      console.log(ret);
      this.$echarts.registerMap("china", ret.data);
      const initOption = {
        title: {
          text: "▎商家分布",
          left: 20,
          top: 20,
        },

        geo: {
          type: "map",
          map: "china",
          top: "5%",
          bottom: "5%",
          itemStyle: {
            areaColor: "#2172BF",
            borderColor: "#333",
          },
        },
        legend: {
          left: "5%",
          bottom: "5%",
          orient: "vertical", //垂直摆放
        },
      };
      this.chartInstance.setOption(initOption);
      //地图点击事件的监听
      this.chartInstance.on("click", async (arg) => {
        console.log(arg);
        const provinceIfo = getProvinceMapInfo(arg.name);
        console.log(provinceIfo);
        //获取这个省份的地图矢量数据
        //判断当前点击的这个省份的地图矢量数据在MapData中是否存在
       
           if (!this.mapData[provinceIfo.key]) {
          const ret = await axios.get(
            "http://localhost:9000" + provinceIfo.path
          );
          this.mapData[provinceIfo.key] = ret.data;
          this.$echarts.registerMap(provinceIfo.key, ret.data);
         
      
        
        }
       

        const changeOption = {
          geo: {
            map: provinceIfo.key,
          },
        };
        this.chartInstance.setOption(changeOption);
      });
    },
    async getData() {
      // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
      const { data: ret } = await this.$http.get("map");
      this.allData = ret;
      console.log(this.allData);
      this.updateChart();
    },
    updateChart() {
      // 处理图表需要的数据
      //图例的数据
      const legendArr = this.allData.map((item) => {
        return item.name;
      });
      const seriesArr = this.allData.map((item) => {
        //return对象代表一个类别下的所有散点数据
        //如果想在地图中显示散点的数据，所以我们需要给散点的图表增加一个配置，coordinateSystem
        return {
          type: "effectScatter",
          name: item.name,
          data: item.children,
          coordinateSystem: "geo", //表示散点图用地图为坐标系
          rippleEffect: {
            scale: 5,
            brushType: "stroke", //设置为空心的涟漪效果
          },
        };
      });
      const dataOption = {
        legend: {
          data: legendArr,
        },
        series: seriesArr,
      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.map_ref.offsetWidth / 100) * 3.6;
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        legend: {
          itemWidth: titleFontSize / 2,
          itemHeight: titleFontSize / 2,
          itemGap: titleFontSize / 4, //图例之间间隔设置
          textStyle: {
            fontSize: titleFontSize / 2,
          },
        },
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    //回到中国地图
    revertMap() {
      const reverOption = {
        geo: {
          map: "china",
        }
      };
      this.chartInstance.setOption(reverOption);
    }
  }
};
</script>

<style lang='less' scoped>
</style>
