<template>
  <div>
    <el-container>
      <el-header>
        欢迎进入管理系统首页
        <div class="u">
          <span>{{getUserInfo.username}}</span>
          <el-button @click="logout" type="primary" plain>退出</el-button>
        </div>

      </el-header>
      <el-container>
        <el-aside width="220px">
          <v-nav></v-nav>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import vNav from "../components/vnav";
export default {
  data() {
    return {
    };
  },
  methods: {
    ...mapActions(['changeUserInfoAction']),
    logout(){
      this.changeUserInfoAction(null)
      this.$router.push('/login')

    }
  },
  components: {
    vNav,
  },
  computed:{
    ...mapGetters(['getUserInfo'])
  }
};
</script>

<style lang="stylus" scoped>
.el-header {
  height: 100px !important;
  background-color: salmon;
  color: #333;
  box-sizing: border-box;
  font-weight: 600;
  padding-left: 50px;
  line-height: 100px;
  font-size: 32px;
  color: white;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  line-height: 200px;
  height: 85vh;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  line-height: 30px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside, .el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-table {
  height: 75vh;
}
.u{
  float:right;
  line-height:100px;
}
</style>
