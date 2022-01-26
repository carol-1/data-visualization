<template>
  <div class="com-container">
      <div class="title" :style="comStyle">
          <span>{{showTitle}}</span>
          <span class="iconfont title-icon" :style="comStyle"  @click = "showChoice = !showChoice">&#xe6eb;</span>
          <div class="select-con" v-show="showChoice">
          <div class="select-item title-icon" v-for="item in selectTypes" :key="item.key" @click="handelSelect(item.key)">
              {{item.text}}
          </div>
         
          </div>
      </div>
    <div class="com-chart" ref="trend_ref"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartInstane: null,
      allData: null, // 从服务器中获取的所有数据
      showChoice: false, // 是否显示可选项
      choiceType: "map", // 显示的数据类型
      titleFontSize: 0, // 指明标题的字体大小
    };
  },
  mounted() {
    //生命周期
    this.initChart(),
      this.getData(),
      window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destoryed() {
    window.removeEventListener("resize", this.screenAdapter);
  },
  computed:{
      selectTypes(){
          if(!this.allData){
              return []
          }else{
              return this.allData.type.filter((item)=>{
                  return item.key !== this.choiceType
              })
          }
      },
      showTitle(){
          if(this.allData==null){
              return ;
          }
          return this.allData[this.choiceType].title;
      },
      //设置标题的样式
      comStyle(){
return {
    fontSize: this.titleFontSize + 'px'
}
      }

  },
  methods: {
     
    //初始化对象
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.trend_ref, "chalk");
      const initOption = {
           //坐标轴大小的配置
      grid:{
         left:'3%',
         right:'4%',
         top:'35%',
         bottom:'1%',
         containLabel:true//把坐标轴文字控制在范围大小里
      },
      //工具提示
      tooltip:{
          trigger:'axis'
      },
      //图例的显示
      legend:{
      left:20,
      top:'20%',
      icon:'circle'
      },
        xAxis: {
          type: "category",
          boundaryGap:false//控制是否需要间隔
        },
        yAxis: {
          type: "value",
        },
      };
      this.chartInstance.setOption(initOption);
    },
    //获取服务器数据
    async getData() {
      const { data: ret } = await this.$http.get("trend");

      this.allData = ret;
      console.log(this.allData);
      this.updateChart();
    },
    //更新图表
    updateChart() {
         // 半透明的颜色值
      const colorArr1 = [
        'rgba(11, 168, 44, 0.5)',
        'rgba(44, 110, 255, 0.5)',
        'rgba(22, 242, 217, 0.5)',
        'rgba(254, 33, 30, 0.5)',
        'rgba(250, 105, 0, 0.5)'
      ]
      // 全透明的颜色值
      const colorArr2 = [
        'rgba(11, 168, 44, 0)',
        'rgba(44, 110, 255, 0)',
        'rgba(22, 242, 217, 0)',
        'rgba(254, 33, 30, 0)',
        'rgba(250, 105, 0, 0)'
      ]
      //处理数据
      //x轴数据
      const timeArr = this.allData.common.month;
      //y轴数据
      const valueArr = this.allData[this.choiceType].data;
      const seriesArr = valueArr.map((item,index) => {
        return {
          name: item.name,
          type: "line",
          data: item.data,
          stack: "this.choiceType", //以堆叠图形式显示
          areaStyle:{
              color: new this.$echarts.graphic.LinearGradient(0,0,0,1,[
                  {
                       offset:0,
                       color:colorArr1[index]

                  },{
                       offset:1,
                       color:colorArr2[index]
}
              ])
          }
        };
      });
      //图例的数据
      const legendArr = valueArr.map((item) => {
        return item.name;
      });
      const dataOption = {
        xAxis: {
          data: timeArr,
        },
        legend: {
          data: legendArr,
        },
        series: seriesArr,
      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
    this.titleFontSize = this.$refs.trend_ref.offsetWidth /100*3.6;
     
      const adapterOption = {
          legend:{
              itemWidth:this.titleFontSize,
              itemHeight:this.titleFontSize,
              itemGap:this.titleFontSize,
              textStyle:{
                  fontSize: this.titlefontSize/2
              }
          }
      };
      this.chartInstance.setOption(adapterOption);
      //调用屏幕自适应效果
      this.chartInstance.resize();
    },
    handelSelect(currentType){
  this.choiceType = currentType
  this.updateChart()
  this.showChoice = false
    }
  },
};
</script>

<style lang="less" scoped>
.title {
    position:absolute;
    left:20px;
    top:20px;
    z-index:10;
    color:white;
    .title-icon{
    margin-left:10px;
    cursor:pointer;
}
.select-con {
    background-color:#222733;
}
}

</style>