<template>
  <div>
    <el-row v-if="arr.length">
      <el-col :span="24" class="progress_container">
        <el-progress
          :text-inside="true"
          :stroke-width="26"
          :percentage="percentage"
          status="success"
        ></el-progress>
      </el-col>
      <el-col
        :span="24"
        class="complete_container"
        v-show="showNowArray.length"
      >
        <div class="complete_title">未完成的计划</div>
        <el-collapse :accordion="true" v-model="activeNames1">
          <template v-for="(item, index) in showNowArray">
            <el-collapse-item
              v-if="!item.isComp"
              :key="item.id"
              :name="item.id"
            >
              <template slot="title">
                <span style="color: #409eff; font-size: 16px">{{
                  item.title
                }}</span>
                <span
                  style="
                    color: #67c23a;
                    font-size: 14px;
                    position: absolute;
                    right: 50px;
                  "
                  >{{ item.type }}</span
                >
              </template>

              <div v-html="item.container"></div>
              <time style="display: inline-block; margin: 20px 0px; color: #999"
                >{{ item.time1 }}
              </time>
              <el-row
                type="flex"
                justify="space-around"
                style="margin-top: 20px"
              >
                <el-button type="primary" @click="changePlan(item, index)"
                  >修改</el-button
                >
                <el-button type="success" @click="completePlan(index)"
                  >完成</el-button
                >
              </el-row>
            </el-collapse-item>
          </template>
        </el-collapse>
      </el-col>
      <el-col class="complete_container" v-show="showComArray.length">
        <div class="complete_title">已完成的计划</div>
        <el-collapse :accordion="true" v-model="activeNames2">
          <el-collapse-item
            v-for="item in showComArray"
            :key="item.id"
            :name="item.id"
          >
            <template slot="title">
              <span style="font-size: 16px">{{ item.title }}</span>
              <span style="font-size: 14px; position: absolute; right: 50px">{{
                item.type
              }}</span>
            </template>

            <div class="collapase_container" v-html="item.container"></div>
            <time style="display: inline-block; margin: 20px 0px; color: #999"
              >{{ item.time1 }} -
            </time>

            <time style="display: inline-block; margin: 20px 0px; color: #999">
              - {{ item.time2 }}
            </time>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <no-data title="暂无计划" v-else></no-data>
  </div>
</template>

<script>
import noData from "../noData";

export default {
  components: {
    noData,
  },
  data() {
    return {
      activeNames1: ["1"],
      activeNames2: ["1"],
      arr: this.$store.state.allArray,
    };
  },
  computed: {
    /**
     * 展示未完成的计划
     */
    showNowArray() {
      let arr = this.arr;
      arr.forEach((item) => {
        item.time1 = this.conversionTime(item.time1);
      });
      return arr;
    },

    showComArray() {
      let arr = this.arr;
      arr = arr.filter((item) => item.isComp);
      arr.forEach((item) => {
        item.time2 = this.conversionTime(item.time2);
      });
      return arr;
    },

    // 进度条的进度
    percentage() {
      const lenNow = this.showNowArray.length;
      const lenCom = this.showComArray.length;
      if (lenNow == 0) {
        return;
      }
      let number = parseInt((lenCom / lenNow) * 100);
      return number;
    },
  },
  methods: {
    // 点击修改按钮时
    changePlan(item, index) {
        const obj = {...item}
        obj.container = obj.container
        .replace(/(<br\/>)+/g, "\n")
        .replace(/(&nbsp;)+/g, "\t")
        .replace(/(&gt)+/g, ">")
        .replace(/(&lt\/)+/g, "</")
        .replace(/(&lt)+/g, "<");


      item.time1 = new Date(obj.time1);
      this.$store.commit("typeBtn", "update"); //修改表单的类型为修改数据（默认为添加数据）
      this.$store.commit("index", index); // 修改下标保证能修改指定位置的数据
      this.$store.commit("formDate", { ...obj }); // 修改表单数据
      this.$store.commit("dialogVisible", true); // 展示表单
    },

    // 点击完成按钮时
    completePlan(index) {
      this.$store.commit("completePlan", index);
    },

    /**
     * 生成格式化的时间
     * @param {Date} time 时间对象
     */
    conversionTime(time) {
      time = new Date(time);
      const year = time.getFullYear();
      const month = time.getMonth() + 1;
      const day = time.getDate();

      return `${year}-${month}-${day}`;
    },
  },
};
</script>

<style>
.progress_container {
  height: 40px;
  background: #fff;
}

.complete_container {
  margin-top: 30px;
  color: #ccc;
}
.collapase_container {
  font-size: 16px;
  line-height: 30px;
}
</style>