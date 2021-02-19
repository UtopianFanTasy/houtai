<template>
  <div>
    <el-table :data="getBannerList" border style="width: 100%">
      <el-table-column prop="id" label="编号"> </el-table-column>
      <el-table-column prop="title" label="轮播图标题"> </el-table-column>
      <el-table-column label="图片"> 
        <template slot-scope="item">
            <div>
            <img class="img" :src="item.row.img?$imgUrl+item.row.img:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.yuntouxiang.com%2Fuploads%2F20130521%2F21-022304_646.jpg&refer=http%3A%2F%2Fimg1.yuntouxiang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613618695&t=17dfd52b655f2f65d7450c5577e9dab6'" alt="">
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getBannerDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getBannerListAction();
  },
  computed: {
    ...mapGetters({
      getBannerList: "banner/getBannerList",
    }),
  },
  methods: {
    ...mapActions({
      getBannerListAction: "banner/getBannerListAction",
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
          getBannerDelete({id}).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getBannerListAction();
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
.img{
  height: 120px;

}

</style>
