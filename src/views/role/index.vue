<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form
          :inline="true"
          ref="form"
          :model="form"
          class="demo-form-inline"
        >
          <el-form-item label="角色名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
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
          <el-table-column prop="name" label="角色名称"> </el-table-column>
          <el-table-column prop="description" label="描述"> </el-table-column>
          <el-table-column prop="createdTime" label="添加时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="editRole(scope.row)" size="small" type="text"
                >分配菜单</el-button
              >
              <el-button @click="editRole(scope.row)" size="small" type="text"
                >分配资源</el-button
              >
              <el-button @click="editRole(scope.row)" size="small"
                >编辑</el-button
              >
              <el-button @click="delRole(scope.row)" type="danger" size="small"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="form.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import Vue from "vue";
import { getRolePages } from "@/services/role";
export default Vue.extend({
  data() {
    return {
      tableData: [],
      form: {
        name: "",
        size: 10,
        current: 1
      },
      totalCount: 0
    };
  },
  created() {
    this.loadAllRoles();
  },
  methods: {
    onSubmit() {
      this.loadAllRoles();
    },
    async loadAllRoles() {
      const { data } = await getRolePages(this.form);
      this.tableData = data.data.records;
    },
    editRole(row) {
      this.$router.push({
        name: "menu-edit",
        params: {
          id: row.id
        }
      });
    },
    delRole(row) {
      this.$confirm("确认删除吗？", "提示", {
        type: "warning"
      }).then(() => {
        this.loadAllRoles();
        console.log(row);
        this.$message.success("删除成功");
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.form.size = val;
      this.form.current = 1;
      this.loadAllRoles();
    },
    handleCurrentChange(val) {
      this.form.current = val;
      this.loadAllRoles();
    }
  }
});
</script>

<style lang="scss" scoped></style>
