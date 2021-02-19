<template>
  <div>
    <el-dialog
      center
      :before-close="cancel"
      :title="addInfo.isAdd ? '添加角色' : '编辑角色'"
      :visible.sync="addInfo.isShow"
    >
      <el-form :model="roleForm" :rules="rules" ref="ruleForm">
        <el-form-item
          prop="rolename"
          label="角色名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="roleForm.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="getmenuList"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            default-expand-all
            ref="tree"
            :check-strictly="true"
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="roleForm.status"
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
import { mapGetters, mapActions, } from "vuex";
import { roleAdd, roleInfo,roleEdit } from "../../util/axios";
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "title",
      },
      roleForm: {
        status: 1,
        rolename: "",
        menus: "",
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  mounted() {
    this.getMenuListAction();
  },
  props: ["addInfo"],
  methods: {
    ...mapActions({
      getMenuListAction: "menu/getMenuListAction",
      getRoleListAction: "role/getRoleListAction",
    }),
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.roleForm.menus = this.$refs.tree.getCheckedKeys().join(",");
          roleAdd(this.roleForm).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel(), this.getRoleListAction();
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
      this.roleForm = {
        status: 1,
        rolename: "",
        menus: "",
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    look(id) {
      roleInfo({ id }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.roleForm = res.data.list;
          this.$refs.tree.setCheckedKeys(this.roleForm.menus.split(","));
          this.roleForm.id=id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.roleForm.menus = this.$refs.tree.getCheckedKeys().join(",");
          roleEdit(this.roleForm).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel(),
              this.getRoleListAction();
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
      getmenuList: "menu/getmenuList",
    }),
  },
};
</script>

<style lang="" scoped>
</style>
