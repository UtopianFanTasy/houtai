<template>
  <div>
    <el-table :data="getRoleList" border style="width: 100%">
      <el-table-column prop="id" label="角色编号"> </el-table-column>
      <el-table-column prop="rolename" label="角色名称"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status==1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template> 
        </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="item">
          <div>
            <el-button type="primary" @click="edit(item.row.id)"
              >编 辑</el-button
            >
            <el-button type="danger" @click="del(item.row.id)">删 除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {roleDelete,infoMenu} from '../../util/axios'
export default {
  data() {
    return {};
  },
  mounted() {
    this.getRoleListAction();
  },
  computed: {
    ...mapGetters({
      getRoleList: "role/getRoleList",
    }),
  },
  methods: {
    ...mapActions({
      getRoleListAction: "role/getRoleListAction",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          roleDelete({ id }).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getRoleListAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="" scoped>
</style>
