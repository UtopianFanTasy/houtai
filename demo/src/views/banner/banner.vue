<template>
  <div class="ax">
    <el-bread-i></el-bread-i>
    <el-button type="primary" @click="toOpen" plain>添加</el-button>
    <v-table @edit="edit"></v-table>
    <v-add ref="vAdd" :addInfo="addInfo" @cancel="cancel"></v-add>
  </div>
</template>

<script>
import vTable from "./list";
import vAdd from "./add";
export default {
  data() {
    return {
      addInfo: {
        isShow: false,
        isAdd: true,
      },
    };
  },
  components: {
    vTable,
    vAdd,
  },
  methods: {
    toOpen() {
      this.addInfo.isShow = true;
      this.addInfo.isAdd = true;
    },
    cancel(e) {
      this.addInfo = e;
    },
    edit(e) {
      this.addInfo.isShow = true;
      this.addInfo.isAdd = false;
      this.$refs.vAdd.look(e)
    },
  },
};
</script>

<style lang="stylus" scoped>
.el-button {
  margin-bottom: 20px;
}
.ax{
  overflow auto
  height: 730px;
}
</style>
