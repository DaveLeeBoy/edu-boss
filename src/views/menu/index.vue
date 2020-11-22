<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({ name: 'menu-create' })"
          >添加菜单</el-button
        >
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            type="index"
            label="编号"
            width="50"
          ></el-table-column>
          <el-table-column prop="name" label="菜单名称"> </el-table-column>
          <el-table-column prop="level" label="菜单级数"> </el-table-column>
          <el-table-column prop="icon" label="前端图标"> </el-table-column>
          <el-table-column prop="orderNum" label="排序"> </el-table-column>
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
    </el-card>
  </div>
</template>

<script>
import Vue from "vue";
import { getAllMenus, deleteMenu } from "@/services/menu";
export default Vue.extend({
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.loadAllMenus();
  },
  methods: {
    async loadAllMenus() {
      const { data } = await getAllMenus();
      this.tableData = data.data;
    },
    editMenu(row) {
      this.$router.push({
        name: "menu-edit",
        params: {
          id: row.id
        }
      });
    },
    delMenu(row) {
      this.$confirm("确认删除吗？", "提示", {
        type: "warning"
      }).then(() => {
        deleteMenu(row.id);
        this.loadAllMenus();
        this.$message.success("删除成功");
      });
    }
  }
});
</script>

<style lang="scss" scoped></style>
