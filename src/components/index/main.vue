<template>
  <el-row>
    <el-col :span="24" class="progress_container">
      <el-progress
        :text-inside="true"
        :stroke-width="26"
        :percentage="percentage"
        status="success"
      ></el-progress>
    </el-col>
    <el-col :span="24" class="plan_container">
      <el-collapse :accordion="true" v-model="activeNames">
        <el-collapse-item
          v-for="(item, index) in collapseItemList"
          :title="item.title"
          :key="item.id"
          :name="item.id"
        >
          <div>{{ item.container }}</div>
          <time style="margin: 20px 0px; color: #999">{{ item.time1 }} </time>
          <el-row type="flex" justify="space-around" style="margin-top: 20px">
            <el-button type="primary" @click="changePlan(item)">修改</el-button>
            <el-button type="success" @click="completePlan(index)"
              >完成</el-button
            >
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-col>
  </el-row>
</template>

<script>

export default {
  mounted() {
    this.allPlanNumber = this.collapseItemList.length;
  },
  data() {
    return {
      activeNames: ["1"],
      completePlanNumber: 0,
      allPlanNumber: 0,
      collapseItemList: this.$store.state.array,
    };
  },
  computed: {
      // 进度条的进度
    percentage() {
      let number = (this.completePlanNumber / this.allPlanNumber) * 100;
      number = isNaN(number) ? 0 : number;
      return number;
    },
  },
  methods: {
      // 点击修改
    changePlan(item) {
      this.$store.commit("formDate", { ...item });
      this.$store.commit("dialogVisible", true);
    },
    // 点击完成
    completePlan(index) {
      this.collapseItemList.splice(index, 1);
      this.completePlanNumber++;
    },
  },
};
</script>

<style>
.progress_container {
  height: 40px;
  background: #fff;
}
.plan_container {
  height: calc(100% - 26px);
  overflow: scroll;
}
</style>