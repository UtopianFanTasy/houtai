<template>
  <div>
    <el-dialog
      center
      :before-close="cancel"
      :title="addInfo.isAdd ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="addInfo.isShow"
    >
      <el-form :model="bannerForm" :rules="rules" ref="ruleForm">
        <el-form-item
          prop="title"
          label="轮播图名称："
          :label-width="formLabelWidth"
        >
          <el-input v-model="bannerForm.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            :auto-upload="false"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="handleExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- 预览展示 -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>

        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="bannerForm.status"
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
import { getBannerAdd, getBannerEdit, getBannerInfo } from "../../util/axios";
export default {
  data() {
    return {
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览的弹框默认是false
      imgUrl: "", //文件图片的配置对象
      fileList: [], //文件列表
      bannerForm: {
        title: "",
        img: "",
        status: 1, //1是正常2禁用
      },
      rules: {
        title: [
          { required: true, message: "请输入轮播图名称", trigger: "blur" },
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
    this.getBannerListAction();
  },
  props: ["addInfo"],
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //当文件改变时，触发的函数方法
    onChange(file) {
      // console.log(file, "文件的属性配置");
      this.imgUrl = file.raw;
    },
    //预览时的删除
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    //放大预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    ...mapActions({
      getBannerListAction: "banner/getBannerListAction",
    }),

    cancel() {
      this.$emit("cancel", {
        isShow: false,
        isAdd: this.addInfo.isAdd,
      });
      this.reset();
    },
    reset() {
      this.bannerForm = {
        title: "", //轮播图名称
        img: "", //图片(文件)
        status: 1, //状态1正常2禁用
      };
      this.fileList= []
      this.$refs["ruleForm"].resetFields();
    },
    look(id) {
      getBannerInfo({ id }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.bannerForm = res.data.list;
          this.bannerForm.id = id;
          this.fileList = this.bannerForm.img
            ? [{ url: this.$imgUrl + this.bannerForm.img }]
            : [];
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          this.bannerForm.img = this.imgUrl ? this.imgUrl : this.bannerForm.img;

          getBannerEdit(this.bannerForm).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getBannerListAction();
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
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          
          this.bannerForm.img = this.imgUrl;

          getBannerAdd(this.bannerForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getBannerListAction();
              //重新调取总条数
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
      getBannerList: "banner/getBannerList",
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
