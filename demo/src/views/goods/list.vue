<template>
  <div>
    <el-table :data="getGoodsList" border style="width: 100%">
      <el-table-column prop="id" label="商品编号"> </el-table-column>
      <el-table-column prop="goodsname" label="商品名称"> </el-table-column>
      <el-table-column prop="price" label="商品价格"> </el-table-column>
      <el-table-column prop="market_price" label="市场价格"> </el-table-column>
      <el-table-column label="图片"> 
        <template slot-scope="item">
            <div>
            <img class="img" :src="item.row.img?$imgUrl+item.row.img:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.yuntouxiang.com%2Fuploads%2F20130521%2F21-022304_646.jpg&refer=http%3A%2F%2Fimg1.yuntouxiang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613618695&t=17dfd52b655f2f65d7450c5577e9dab6'" alt="">
          </div>
        </template>
      </el-table-column>
       <el-table-column prop="isnew" label="是否新品"> 
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.isnew == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>
       <el-table-column prop="ishot" label="是否热卖"> 
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.ishot == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
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
      :page-size="getGoodsSize"
      :total="getCountNum"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getGoodsDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getGoodsListAction();
    this.getCountNumAction();
  },
  computed: {
    ...mapGetters({
      getGoodsList: "goods/getGoodsList",
      getGoodsSize: "goods/getGoodsSize",
      getCountNum: "goods/getCountNum",
    }),
  },
  methods: {
    ...mapActions({
      getGoodsListAction: "goods/getGoodsListAction",
      getCountNumAction: "goods/getCountNumAction",
      changePageAction:'goods/changePageAction'
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
          getGoodsDelete({id}).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getGoodsListAction();
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
.img{
  height: 120px;

}

</style>
