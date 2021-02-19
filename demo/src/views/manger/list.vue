<template>
  <div>
    <el-table :data="getMangerList" border style="width: 100%">
      <el-table-column prop="uid" label="用户编号"> </el-table-column>
      <el-table-column prop="username" label="用户名称"> </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="item">
          <div>
            <el-button type="primary" @click="edit(item.row.uid)"
              >编 辑</el-button
            >
            <el-button type="danger" @click="del(item.row.uid)">删 除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="getMangerSize"
      :total="getCountNum"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { roleDelete, infoMenu ,mangerDelete} from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getMangerListAction();
    this.getCountNumAction();
  },
  computed: {
    ...mapGetters({
      getMangerList: "manger/getMangerList",
      getMangerSize: "manger/getMangerSize",
      getCountNum: "manger/getCountNum",
    }),
  },
  methods: {
    ...mapActions({
      getMangerListAction: "manger/getMangerListAction",
      getCountNumAction: "manger/getCountNumAction",
      changePageAction:'manger/changePageAction'
    }),
    changePage(n) {
      console.log(n);
      this.changePageAction(n)
    },
    edit(id) {
      this.$emit("edit", id);
    },
    del(uid) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          mangerDelete({uid}).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getMangerListAction();
              this.getCountNumAction();
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
