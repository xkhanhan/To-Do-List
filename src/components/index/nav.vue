<template>
  <el-row :gutter="20" class="nav">
    <el-col :span="20" class="nav_search" >
      <el-input v-model="inputValue" placeholder="请输入查询内容" clearable></el-input>
    </el-col>
    <el-col :span="4">
      <el-button icon="el-icon-search" circle></el-button>
    </el-col>
  </el-row>

</template>

<script>
export default {
    data() {
        return {
            inputValue : ''
        }
    },
    methods: {
     
    },
};
</script>

<style scoped>


</style>