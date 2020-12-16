<template>
  <div class="nodata_container">
    <div class="icon el-icon-receiving"></div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "暂无数据",
    },
  },
};
</script>

<style scoped>
.nodata_container {
    font-size: 80px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  height: 400px;
  width: 100%;
  color: #ccc;
}
.nodata_container .title{
    font-size: 14px;
    color: #000;
}
</style>