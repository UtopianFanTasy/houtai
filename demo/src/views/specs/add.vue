<template>
  <div>
    <el-dialog
      center
      :before-close="cancel"
      :title="addInfo.isAdd ? '添加规格' : '编辑规格'"
      :visible.sync="addInfo.isShow"
    >
      <el-form :model="specsForm" :rules="rules" ref="ruleForm">
        <el-form-item
          prop="username"
          label="规格名称："
          :label-width="formLabelWidth"
        >
          <el-input v-model="specsForm.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="规格属性："
          prop="password"
          :label-width="formLabelWidth"
          v-for="(item, index) in attrArr" :key="index"
        >
          <el-input
            class="a75"
            v-model="item.value"
            autocomplete="off"
          ></el-input>
          <el-button v-if="index==0" type="primary" @click="arry">新增规格属性</el-button>
          <el-button v-else type="danger" @click.prevent="removeDomain(item)">删除</el-button>
        </el-form-item>

        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="specsForm.status"
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
import { getSpecsAdd, getSpecsEdit, getSpecsInfo } from "../../util/axios";
export default {
  data() {
    return {
      attrArr: [{
        value:''
      }],
      defaultProps: {
        children: "children",
        label: "title",
      },
      specsForm: {
        attrs: "",
        specsname: "",
        status: 1, //1是正常2禁用
      },
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  mounted() {
    
  },
  props: ["addInfo"],
  methods: {
    arry() {
      if(this.attrArr.length<6){
       this.attrArr.push({value:''}) 
      }else{
        this.$message.warning('最多只能添加5个规格')
      }    
    },
    ...mapActions({
      getSpecsListAction: "specs/getSpecsListAction",
      getCountNumAction: "specs/getCountNumAction",
    }),
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.specsForm.attrs = this.attrArr.map(item=>item.value).join(',')
          console.log(this.specsForm);
          getSpecsAdd(this.specsForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getSpecsListAction();
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
      this.specsForm = {
        attrs: "",
        specsname: "",
        status: 1, //1是正常2禁用
      };
      this.$refs["ruleForm"].resetFields();
      this.attrArr=[{
        value:''
      }]
    },
    look(id) {
      getSpecsInfo({ id }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.specsForm = res.data.list[0];
          this.specsForm.id = id;
          this.specsForm.attrs.map((item,index)=>{
            if(index==0){
              this.attrArr[0].value=item
            }else{
              this.attrArr.push({
                value:item
              })
            }
          })
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getSpecsEdit(this.specsForm).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getSpecsListAction();
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
     removeDomain(item) {
        var index = this.attrArr.indexOf(item)
        if (index !== -1) {
          this.attrArr.splice(index, 1)
        }
      },
  },
  computed: {
    ...mapGetters({
     
    }),
  },
};
</script>

<style lang="" scoped>
.a75 {
  width: 70%;
  margin-right: 20px;
}
</style>
