<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加菜单' : '编辑菜单'"
      center
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
    >
      <el-form :model="menu" :rules="rules" ref="ruleForm">
        <el-form-item
          label="菜单名称："
          prop="title"
          :label-width="formLabelWidth"
        >
          <el-input v-model="menu.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="上级菜单："
          prop="pid"
          :label-width="formLabelWidth"
        >
          <el-select v-model="menu.pid" placeholder="请选择上级菜单">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型：" :label-width="formLabelWidth">
          <el-radio v-model="menu.type" :label="1">目录</el-radio>
          <el-radio v-model="menu.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item
          v-if="menu.type == 1"
          label="菜单图标："
          :label-width="formLabelWidth"
        >
          <el-select v-model="menu.icon" placeholder="请选择icon图标">
            <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else label="菜单地址：" :label-width="formLabelWidth">
          <el-select v-model="menu.url" placeholder="请选择路由地址">
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="menu.status"
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
        <el-button v-if="addInfo.isAdd" @click="add('ruleForm')" type="primary"
          >确 定</el-button
        >
        <el-button v-else  type="primary" @click="updata('ruleForm')"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addMenu,infoMenu,editMenu} from "../../util/axios";
import { indexRoutes } from "../../router";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      menu: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      formLabelWidth: "120px",
      iconList: [
        "el-icon-setting",
        "el-icon-delete",
        "el-icon-s-goods",
        "el-icon-goods",
      ],
      indexRoutes,
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
      },
    };
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getmenuList",
    }),
  },
  methods: {
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
    }),
    cancel() {
      this.$emit("cancel", {
        isShow: false,
        isAdd: this.addInfo.isAdd,
      });
      console.log(this.addInfo.isAdd);
      this.reset();
    },
    reset() {
      this.menu = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    add(formName) {
      console.log(this.menu);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addMenu(this.menu).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getMenuList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("发生错误");
          return false;
        }
      });
    },
    look(id){
      infoMenu({id})
      .then(res=>{
        console.log(res);
        if(res.data.code===200){
          this.menu=res.data.list
          this.menu.id=id
        }
      })
    },
     updata(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editMenu(this.menu).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getMenuList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("发生错误");
          return false;
        }
      });
    },
  },
  props: ["addInfo"],
};
</script>

<style lang="" scoped>
</style>
