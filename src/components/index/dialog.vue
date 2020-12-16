<template>
  <el-dialog
    title="添加计划"
    :visible.sync="$store.state.dialogVisible"
    width="95%"
    :before-close="handleClose"
    top="60px"
  >
    <el-form
      ref="form"
      :rules="rules"
      labelPosition="top"
      :model="formData"
      label-width="80px"
      size="mini"
    >
      <el-form-item label="计划名称" prop="title">
        <el-input v-model="formData.title" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="计划起始时间" prop="time1">
        <el-date-picker
          type="date"
          placeholder="选择起始日期"
          v-model="formData.time1"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="计划类型" prop="type">
        <el-select v-model="formData.type" filterable placeholder="请输入内容">
          <el-option
            v-for="item in typeArray"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="计划内容" prop="container">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="formData.container"
          maxlength="200"
          :autosize="{ minRows: 3, maxRows: 6 }"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="handleClose">取消</el-button>
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

    /**
     * 用于判断是 添加buttton 还是 修改button
     * 方便点击表单的创建时执行不同的操作
     */
    typeBtn: {
      type: String,
      default: "add",
    },
  },
  data() {
    return {
      formData: {},
      typeArray: [
        { value: "运动", label: "运动" },
        { value: "学习", label: "学习" },
        { value: "工作", label: "工作" },
        { value: "旅行", label: "旅行" },
        { value: "其他", label: "其他" },
      ],
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
        time1: [{ required: true, message: "计划起始时间", trigger: "blur" }],
        type: [{ required: true, message: "请输入计划类型" }],
        container: [
          { required: true, message: "请输入计划内容", trigger: "blur" },
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
    this.formData = {
      ...this.defaulteForm,
    };
  },
  methods: {
    // 关闭弹窗事件
    handleClose() {
      this.$store.state.dialogVisible = false;
      console.log("x");
    },

    // 提交表单事件
    onSubmit() {
      if (this.$store.state.submit) {
        return;
      } else {
        // 进行规则校验
        this.$refs["form"].validate((valid) => {
          // 规则不符合时不进行任何操作
          if (!valid) {
            return false;
          } else {
            this.$store.state.submit = true;
            this.$store.commit("dialogVisible", false); // 关闭弹窗
            this.formData.container = this.preText(this.formData.container);
            // 判断是修改还是添加
            if (this.typeBtn == "add") {
              this.$store.commit("addArray", this.formData); // 提交一个数据添加
            } else if (this.typeBtn == "update") {
              this.$store.commit("updateArray", this.formData);
            }
          }
        });
      }
    },
    /**
     * 处理文本域的格式
     */
    preText(pretext) {
      return pretext
        .replace(/</g, "&lt")
        .replace(/>/g, "&gt")
        .replace(/<\//g, "&lt/")
        .replace(/\r\n/g, "<br/>")
        .replace(/\n/g, "<br/>")
        .replace(/\s/g, "&nbsp;");
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
      this.formData = {
        ...this.defaulteForm,
      };
    },
  },
};
</script>