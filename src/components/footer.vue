<template>
  <el-row type="flex" justify="center" align="center">
    <el-col>
      <router-link to="/">
        <span class="el-icon-monitor"></span>
        <p>首页</p>
      </router-link>
    </el-col>
    <el-col>
      <router-link to="/data">
        <span class="el-icon-receiving"></span>
        <p>数据</p>
      </router-link>
    </el-col>
    <el-col>
      <router-link to="/user">
        <span class="el-icon-user"></span>
        <p>个人</p>
      </router-link>
    </el-col>
  </el-row>
</template>

<script>
export default {};
</script>

<style  scoped>
.el-row {
  text-align: center;
  background: #fff;
}
.el-col {
  font-size: 16px;
}
.el-col > * {
  color: #409eff;
  margin: 2px 0;
  text-decoration: none;
}
a {
  display: inline-block;
  width: 100%;
  height: 100%;
}
p {
  margin-top: 5px;
}
</style>