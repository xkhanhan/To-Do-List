<template>
  <el-row style="height: 100%">
    <el-col class="mybody">
      <my-main />
      <el-button
        class="add"
        type="primary"
        icon="el-icon-edit"
        circle
        @click="handleAdd()"
      ></el-button>
      <el-button
        class="remove"
        type="danger"
        icon="el-icon-delete"
        @click="handleRemove"
        circle
      ></el-button>
    </el-col>
    <my-dialog
      :defaulteForm="$store.state.formDate"
      :typeBtn="$store.state.typeBtn"
    ></my-dialog>
  </el-row>
</template>

<script>
import myMain from "@/components/index/main.vue";
import myDialog from "@/components/index/dialog.vue";

export default {
  components: {
    myMain,
    myDialog,
  },
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
    };
  },

  methods: {
    handleRemove() {
      const This = this;
      const array = this.$store.state.allArray;
      const arr = array.filter((item) => !item.isComp);

      if (arr.length) {
        console.log(arr.length);
        this.$confirm("你还有未完成的任务，确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        })
          .then(() => {
            This.$store.commit("remove");
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else if (!array.length) {
        this.$message({
          message: "暂无任务可删除",
          type: "warning",
        });
      } else {
        this.$confirm("确定删除所有完成的的任务?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        })
          .then(() => {
            This.$store.commit("remove");
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    handleAdd() {
      this.$store.commit("dialogVisible", true);
      this.$store.commit("typeBtn", "add");
      this.$store.commit("formDate", {
        title: "", // 计划头
        time1: "", // 计划开始时间
        time2: "", // 计划结束时间
        type: "", // 计划类型
        container: "", // 计划内容
        isComp: false, // 计划是否完成
      });
    },
  },
};
</script>

<style>
.mybody {
  margin: 10px 0;
}

.add {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
.remove {
  position: absolute;
  bottom: 20px;
  left: 10px;
}
.el-message-box--center{
    position: relative;
    top: 40%;
  
}
</style>