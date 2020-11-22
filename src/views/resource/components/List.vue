<template>
  <div>
    <el-card>
      <div slot="header">
        <el-form
          :inline="true"
          ref="form"
          :model="formInline"
          class="demo-form-inline"
        >
          <el-form-item label="资源名称" prop="name">
            <el-input
              v-model="formInline.name"
              placeholder="资源名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="url">
            <el-input
              v-model="formInline.url"
              placeholder="资源路径"
            ></el-input>
          </el-form-item>
          <el-form-item label="资源分类" prop="categoryId">
            <el-select v-model="formInline.categoryId">
              <el-option
                v-for="item in categoryList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="clearForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            type="index"
            label="编号"
            width="50"
          ></el-table-column>
          <el-table-column prop="name" label="资源名称"> </el-table-column>
          <el-table-column prop="url" label="资源路径"> </el-table-column>
          <el-table-column prop="description" label="描述"> </el-table-column>
          <el-table-column
            prop="createdTime"
            label="添加时间"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="editMenu(scope.row)" size="small"
                >编辑</el-button
              >
              <el-button @click="delMenu(scope.row)" type="danger" size="small"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="formInline.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="formInline.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import Vue from "vue";
import { getResourcePages, getAllcategory } from "@/services/resource";
export default Vue.extend({
  data() {
    return {
      tableData: [],
      formInline: {
        categoryId: null,
        current: 1,
        name: null,
        size: 10,
        url: null
      },
      totalCount: 0,
      categoryList: []
    };
  },
  created() {
    this.loadResources();
    this.loadCategorys();
  },
  methods: {
    onSubmit() {
      this.loadResources();
    },
    clearForm() {
      this.$refs.form.resetFields();
      this.formInline.current = 1;
      this.loadResources();
    },
    async loadCategorys() {
      const { data } = await getAllcategory();
      this.categoryList = data.data;
    },
    async loadResources() {
      const { data } = await getResourcePages(this.formInline);
      this.tableData = data.data.records;
      this.totalCount = data.data.total;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.formInline.size = val;
      this.formInline.current = 1;
      this.loadResources();
    },
    handleCurrentChange(val) {
      this.formInline.current = val;
      this.loadResources();
    }
  }
});
</script>

<style lang="scss" scoped></style>
