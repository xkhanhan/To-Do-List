<template>
  <el-dialog
    title="添加计划"
    :visible.sync="$store.state.dialogVisible"
    width="95%"
    :before-close="handleClose"
    top="20px"
  >
    <el-form
      ref="form"
      :rules="rules"
      labelPosition="top"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="计划名称" prop="title">
        <el-input v-model="form.title" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="计划起始时间" prop="time1">
        <el-date-picker
          type="date"
          placeholder="选择起始日期"
          v-model="form.time1"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="计划类型" prop="type">
        <el-autocomplete
          class="inline-input"
          v-model="form.type"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          clearable
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="计划内容" prop="container">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="form.container"
          maxlength="200"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="$store.state.dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    defaulteForm: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        title: "",
        time1: "",
        type: "",
        container: "",
      },

      // 校验规则
      rules: {
        title: [
          { required: true, message: "请输入计划标题", trigger: "blur" },
          {
            max: 40,
            min: 3,
            message: "长度在3 到20个字符之间",
            trigger: "blur",
          },
        ],
        time1: [
          {
            required: true,
            type: "date",
            message: "时间格式不正确",
            tigger: "blur",
          },
        ],
        type: [{ required: true, message: "请输入计划标题", trigger: "blur" }],
        container: [
          { required: true, message: "请输入计划标题", trigger: "blur" },
          {
            max: 200,
            min: 3,
            message: "长度在3 到20个字符之间",
            trigger: "blur",
          },
        ],
      },
      restaurants: [],
    };
  },
  mounted() {
    this.restaurants = this.loadAll();
    this.form = {
      ...this.defaulteForm,
    };
  },
  methods: {
    // 关闭弹窗事件
    handleClose() {
      this.$store.state.dialogVisible = false;
    },
    // 提交表单事件
    onSubmit() {
      // 进行规则校验
      this.$refs["form"].validate((valid) => {
        // 规则不符合时不进行任何操作
        if (!valid) {
          return false;
        } else {
          // 关闭弹窗
          this.$store.commit("dialogVisible", false);
          this.$store.commit("addArray", this.form);
        }
      });
    },

    // 选择计划类型时输入框筛选功能
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    // 选择计划类型时输入框筛选功能
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    // 返回数据
    loadAll() {
      return [
        { value: "学习" },
        { value: "运动" },
        { value: "旅游" },
        { value: "工作" },
      ];
    },
  },
  watch: {
    defaulteForm() {
      this.form = {
        ...this.defaulteForm,
      };
    },
  },
};
</script>