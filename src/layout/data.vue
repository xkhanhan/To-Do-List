<template>
  <el-row class="charts_container">
    <template v-if="allArray.length">
      <el-col class="charts">
        <div ref="comPlanBar"></div>
      </el-col>
      <el-col class="charts">
        <div ref="allPlanPie"></div>
      </el-col>
    </template>
    <template v-else>
        <no-data title="暂无计划图表" ></no-data>   
    </template>
  </el-row>
</template>

<script>
import noData from  '@/components/noData.vue';
import echarts from "echarts/dist/echarts-en.common";

export default {
    components:{
        noData
    },
  data() {
    return {
      allArray: this.$store.state.allArray,
    };
  },
  mounted() {
    if (this.allArray.length) {
      this.createBar();
      this.createPie();
    }
  },
  computed: {
    // 已经完成的计划
    completePlan() {
      return this.allArray.filter((item) => item.isComp);
    },
  },
  methods: {
    /**
     * 创建柱状图
     */
    createBar() {
      const key = "type";
      const obj = this.getTypeAndData(this.completePlan, key);
      let dataArray = obj.num;

      const comEl = this.$refs.comPlanBar; //柱状图区域

      //柱状图区域数据
      let comPlanoption = {
        // 柱状图标题
        title: {
          text: "各类型计划完成量",
        },
        // 柱状图每一根的含义
        legend: {
          data: ["完成量"],
        },
        // x轴
        xAxis: {
          data: ["学习", "运动", "旅游", "工作", "其他"],
        },
        // y轴
        yAxis: {},
        tooltip: {},
        series: [
          {
            name: "完成量",
            type: "bar",
            data: dataArray,
          },
        ],
      };

      // 调用创建图表方法
      this.createCharts(comEl, comPlanoption);
    },

    /**
     * 创建饼图
     */
    createPie() {
      const key = "type";
      const obj = this.getTypeAndData(this.allArray, key);
      let typeArray = obj[key];
      let pieArr = obj.pieArr;

      const allEl = this.$refs.allPlanPie; // 饼状图区域
      let allPlanoption = {
        title: {
          text: "各类型计划占比",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: typeArray,
        },
        series: [
          {
            name: "总计划中",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: pieArr,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      this.createCharts(allEl, allPlanoption);
    },

    /**
     * 创建图表方法
     */
    createCharts(dom, options) {
      const myecharts = echarts.init(dom); // 对dom区域初始化
      myecharts.setOption(options); // 使用刚指定的配置项和数据显示图表。
    },

    // 用来获取数组中相同类型的 key 数量方便生成图表
    getTypeAndData(arr, key) {
      let obj = {}; // 用来存放每个类型 和 数量
      // 循环数组
      for (const iterator of arr) {
        // 用于判断该类型计划是否被记录过
        if (iterator[key] in obj) {
          obj[iterator[key]]++; // 被记录过的计划类型 进行 +1 操作
        } else {
          obj[iterator[key]] = 1; // 未记录的计划类型 进行 赋值为 1 操作
        }
      }

      let typeArray = [];
      let DataArray = [];
      let pieArr = [];
      for (const iterator in obj) {
        typeArray.push(iterator);
        DataArray.push(obj[iterator]);

        pieArr.push({
          value: obj[iterator],
          name: iterator,
        });
      }

      return {
        [key]: typeArray,
        num: DataArray,
        pieArr,
      };
    },
  },
};
</script>

<style>
.charts {
  width: 100%;
  height: 500px;
}
.charts > div {
  height: 100%;
  width: 100%;
}
</style>