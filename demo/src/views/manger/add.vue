<template>
  <div>
    <el-dialog
      center
      :before-close="cancel"
      :title="addInfo.isAdd ? '添加用户' : '编辑用户'"
      :visible.sync="addInfo.isShow"
    >
      <el-form :model="mangerForm" :rules="rules" ref="ruleForm">
        <el-form-item
          prop="roleid"
          label="所属角色："
          :label-width="formLabelWidth"
        >
          <el-select v-model="mangerForm.roleid" placeholder="请选择">
            <el-option
              v-for="item in getRoleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          prop="username"
          label="用户名称："
          :label-width="formLabelWidth"
        >
          <el-input v-model="mangerForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="密码："
          prop="password"
          :label-width="formLabelWidth"
        >
          <el-input v-model="mangerForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="mangerForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="addInfo.isAdd" type="primary" @click="add('ruleForm')"
          >添 加</el-button
        >
        <el-button v-else type="primary" @click="update('ruleForm')"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { mangerAdd, mangerEdit, mangerInfo } from "../../util/axios";
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "title",
      },
      mangerForm: {
        roleid: "",
        status: 1,
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  mounted() {
    this.getRoleListAction();
  },
  props: ["addInfo"],
  methods: {
    ...mapActions({
      getRoleListAction: "role/getRoleListAction",
      getMangerListAction: "manger/getMangerListAction",
      getCountNumAction: "manger/getCountNumAction",
    }),
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          mangerAdd(this.mangerForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getMangerListAction();
              this.getCountNumAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      this.$emit("cancel", {
        isShow: false,
        isAdd: this.addInfo.isAdd,
      });
      this.reset();
    },
    reset() {
      this.mangerForm = {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1, //1是正常2禁用
      };
      this.$refs['ruleForm'].resetFields();
    },
    look(uid) {
      mangerInfo({ uid }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.mangerForm = res.data.list;
          this.mangerForm.uid = uid;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          mangerEdit(this.mangerForm).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getMangerListAction();
              this.getCountNumAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      getRoleList: "role/getRoleList",
    }),
  },
};
</script>

<style lang="" scoped>
</style>
