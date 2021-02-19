<template>
  <div>
    <el-header>欢迎来到登录界面</el-header>
    <el-form
      :model="loginList"
      status-icon
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
      ref="rulefrom"
    >
      <el-form-item label="用户名：" prop="username">
        <el-input
          type="text"
          v-model="loginList.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
          type="password"
          v-model="loginList.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="login('rulefrom')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {mangerLogin} from "../util/axios"
export default {
  data() {
    return {
      loginList: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(['changeUserInfoAction']),
    login(formName) {
      console.log(this.$refs.rulefrom);
      this.$refs[formName].validate((valid) => {
        if (valid) {
         mangerLogin(this.loginList)
         .then(res=>{
           if(res.data.code===200){
             this.$message.success(res.data.msg);
            //  sessionStorage.setItem('loginInfo',JSON.stringify(res.data.list))
            this.changeUserInfoAction(res.data.list)
             this.$router.push('/home')
           }else{
              this.$message.error(res.data.msg);
           }
         })
        } else {
          this.$message.error("登录失败，格式错误");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.demo-ruleForm {
  width: 500px;
  margin: 200px auto;
}

.el-header {
    height: 100px !important; 
    background-color: $secondBgColor;
    color: white;
    text-align: center;
    line-height: 100px;
    font-size: 24px;
}
</style>
