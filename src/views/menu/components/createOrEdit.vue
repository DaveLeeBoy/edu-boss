<template>
  <div class="menu-wrap">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        {{ isEdit ? "编辑菜单" : "添加菜单" }}
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.parentId" placeholder="请选择活动区域">
            <el-option label="无上级菜单" :value="-1"></el-option>
            <el-option
              v-for="item in parentMenuList"
              :label="item.name"
              :key="item.id"
              :value="item.id"
            ></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="form.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input
            type="number"
            style="width: 180px"
            v-model="form.desc"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button v-if="isEdit">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Vue from "vue";
import { createOrUpdateMenu, getEditMenuInfo } from "@/services/menu";
export default Vue.extend({
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: "",
        href: "",
        icon: "",
        description: "",
        shown: false,
        parentId: -1
      },
      parentMenuList: []
    };
  },
  created() {
    this.loadMenuInfo();
  },
  methods: {
    async onSubmit() {
      console.log("submit!");
      const { data } = await createOrUpdateMenu(this.form);
      if (data.code === "000000") {
        this.$message.success("提交成功");
        this.$router.back();
      }
    },
    async loadMenuInfo() {
      const { data } = await getEditMenuInfo(this.$route.params.id || -1);
      this.parentMenuList = data.parentMenuList;
      this.form = data.data.menuInfo;
    }
  }
});
</script>

<style lang="scss" scoped></style>
