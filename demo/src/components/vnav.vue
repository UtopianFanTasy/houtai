<template>
  <div>
    <el-row>
      <el-col>
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#544"
          text-color="white"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu :index="item.id.toString()" v-for="item in getUserInfo.menus" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="list.url" v-for="list in item.children" :key="list.id">{{list.title}}</el-menu-item>
            </el-menu-item-group>

          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      defaultActive: "/home",
    };
  },
  computed:{
    ...mapGetters(['getUserInfo'])
  },
  mounted() {
    this.defaultActive = this.$route.path;
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="stylus" scoped>
.el-menu
  height 85vh;

  



</style>
