<template>
  <div>
    <el-table :data="getSpecsList" border style="width: 100%">
      <el-table-column prop="id" label="规格编号"> </el-table-column>
      <el-table-column prop="specsname" label="规格名称"> </el-table-column>
      <el-table-column label="规格属性"> 
        <template slot-scope="item">
          <div>
            <el-tag v-for="attr in item.row.attrs"  type="info" :key='attr'>{{attr}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态"> 
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
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
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="getSpecsSize"
      :total="getCountNum"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getSpecsDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getSpecsListAction();
    this.getCountNumAction();
  },
  computed: {
    ...mapGetters({
      getSpecsList: "specs/getSpecsList",
      getSpecsSize: "specs/getSpecsSize",
      getCountNum: "specs/getCountNum",
    }),
  },
  methods: {
    ...mapActions({
      getSpecsListAction: "specs/getSpecsListAction",
      getCountNumAction: "specs/getCountNumAction",
      changePageAction:'specs/changePageAction'
    }),
    changePage(n) {
      console.log(n);
      this.changePageAction(n)
    },
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
          getSpecsDelete({id}).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getSpecsListAction();
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
