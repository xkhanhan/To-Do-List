<template>
  <el-row style="height: 100%">
    <el-col>
      <my-nav />
    </el-col>
    <el-col class="mybody">
      <my-main />
      <el-button
        class="add"
        type="primary"
        icon="el-icon-edit"
        circle
        @click="handleAdd()"
      ></el-button>
    </el-col>
    <my-dialog :defaulteForm="$store.state.formDate"></my-dialog>
  </el-row>
</template>

<script>
import myNav from "@/components/index/nav.vue";
import myMain from "@/components/index/main.vue";
import myDialog from "@/components/index/dialog.vue";

export default {
  components: {
    myMain,
    myNav,
    myDialog,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    handleAdd() {
      this.$store.commit("dialogVisible", true);
      this.$store.commit("formDate", {});
    },
  },
};
</script>

<style>
.mybody {
  margin: 10px 0;
  height: calc(100% - 40px);
}
.mybody > .el-row {
  height: 100%;
}
.add {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
</style>