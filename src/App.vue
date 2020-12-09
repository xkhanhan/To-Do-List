<template>
  <el-row id="app">
    <el-col class="containter">
      <router-view></router-view>
    </el-col>
    <el-col class="my-footer">
      <my-footer />
    </el-col>
  </el-row>
</template>

<script>
import myFooter from "./components/footer.vue";

export default {
  name: "App",
  components: {
    myFooter,
  },
  created() {
    console.log(this.$route);
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
body {
overflow: hidden;
  box-sizing: border-box;
  margin: 0;
}
#app,body,html{
    height: 100%;
}
.containter{
    height: calc(100% - 60px);
    padding: 13px;
    box-sizing: border-box;
}
.my-footer {
    height: 60px;
  width: 100%;
  position: absolute;
  bottom: 0;
  text-align: center;
  padding: 0;
  border: 1px solid #ebeef5;
}
.my-footer > div {
  width: 100%;
  height: 100%;
}

</style>
