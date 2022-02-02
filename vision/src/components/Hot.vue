<!-- 商家分布图表 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="hot_ref"></div>
    <span class="iconfont arr-left" @click="toLeft" :style="comStyle"
      >&#xe6ef;</span
    >
    <span class="iconfont arr-right" @click="toRight" :style="comStyle"
      >&#xe6ed;</span
    >
    <span class="cat-name" :style="comStyle">{{catName}}</span>
  </div>
</template>

<script>

export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      currentIndex:0,//当前所展示出的一级分类数据
      titleFontSize:0
    }
  },
   computed: {
    catName () {
      if (!this.allData) {
        return ''
      } else {
        return this.allData[this.currentIndex].name
      }
    },
    comStyle () {
      return {
        fontSize: this.titleFontSize + 'px'
      }
    }
  },
  mounted() {
    this.initChart();
    this.getData();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
  },

  methods: {
    async initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.hot_ref, "chalk");
     
      const initOption = {
        title: {
          text: "▎热销商品的占比",
          left: 20,
          top: 20,
        },
        legend:{
           top:'15%',
           icon:'circle'
        },
        tooltip:{
       
            show:true,
            formatter:(arg)=>{
             
              const thirdCategort =  arg.data.children
              let  total=0
              thirdCategort.forEach(item=>{
                total +=  item.value
              })
              let retStr = ''
              thirdCategort.forEach(item=>{
                  retStr += `
                  ${item.name}:${parseInt(item.value/total * 100)+'%'}
                  <br/>
                  `
              })
              return retStr
            }
        },
         series:[{
              type:'pie'
          }]

      };
      this.chartInstance.setOption(initOption);

    },
    async getData() {
      // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
      const { data: ret } = await this.$http.get("hotproduct");
      this.allData = ret;
      console.log(this.allData);
      this.updateChart();
    },
    updateChart() {
        const legendData = this.allData[this.currentIndex].children.map((item)=>{
          return item.name
      })
      const seriesData = this.allData[this.currentIndex].children.map((item)=>{
          return {
              name:item.name,
              value:item.value,
              children:item.children
          }
      })
      
      const dataOption = {
          legend:{
              data:legendData
          },
          series:[{
              data:seriesData
          }]
      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      this.titleFontSize = (this.$refs.hot_ref.offsetWidth / 100) * 3.6;
      const adapterOption = {
          title:{
              textStyle:{
                  fontSize:this.titleFontSize
              }
          },
          legend:{
              itemWidth:this.titleFontSize/2,
              itemHeight:this.titleFontSize/2,
              itemGap:this.titleFontSize/2,
             textStyle: {
            fontSize: this.titleFontSize / 2
          }
          },
          series:[{
              radius:this.titleFontSize*5,
              center:['50%','65%']
          }]
      }
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
   toLeft(){
       this.currentIndex--
       if(this.currentIndex<0){
           this.currentIndex = this.allData.length-1
       }
       this.updateChart()
   },
   toRight(){
       this.currentIndex++
       if(this.currentIndex>this.allData.length-1){
           this.currentIndex = 0
       }
       this.updateChart()
   }
  }
};
</script>

<style lang='less' scoped>
.arr-left {
  position: absolute;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: white;
}
.arr-right {
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: white;
}
.cat-name {
  position: absolute;
  left: 80%;
  bottom: 100px;
  color: white;
}
</style>
