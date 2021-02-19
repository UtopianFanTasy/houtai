<template>
  <div>
    <el-dialog
      center
      :before-close="cancel"
      :title="addInfo.isAdd ? '添加商品' : '编辑商品'"
      :visible.sync="addInfo.isShow"
      @opened="createEditor"
    >
      <el-form :model="goodsForm" :rules="rules" ref="ruleForm">
        <el-form-item
          prop="first_cateid"
          label="一级分类："
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="goodsForm.first_cateid"
            @change="changeCate(false)"
            placeholder="请选择"
          >
            <el-option
              v-for="item in getCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          prop="second_cateid"
          label="二级分类："
          :label-width="formLabelWidth"
        >
          <el-select v-model="goodsForm.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          prop="goodsname"
          label="商品名称："
          :label-width="formLabelWidth"
        >
          <el-input v-model="goodsForm.goodsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="price" label="价格：" :label-width="formLabelWidth">
          <el-input v-model="goodsForm.price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          prop="market_price"
          label="市场价格："
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="goodsForm.market_price"
            autocomplete="off"
          ></el-input>
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
            :on-exceed=" handleExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- 预览展示 -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>

        <el-form-item
          prop="specsid"
          label="商品规格："
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="goodsForm.specsid"
            @change="changeSpecs(false)"
            placeholder="请选择"
          >
            <el-option
              v-for="item in getSpecsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          prop="specsattr"
          label="规格属性："
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="goodsForm.specsattr"
            placeholder="请选择"
            multiple
          >
            <el-option
              v-for="item in guige"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品：" :label-width="formLabelWidth">
          <el-radio v-model="goodsForm.isnew" :label="1">是</el-radio>
          <el-radio v-model="goodsForm.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热门：" :label-width="formLabelWidth">
          <el-radio v-model="goodsForm.ishot" :label="1">是</el-radio>
          <el-radio v-model="goodsForm.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="goodsForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>

        <el-form-item label="商品详情：" :label-width="formLabelWidth">
          <div id="editor"></div>
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
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";
import { getGoodsAdd, getGoodsEdit, getGoodsInfo } from "../../util/axios";
export default {
  data() {
    return {
      editor: null,
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览的弹框默认是false
      imgUrl: "", //文件图片的配置对象
      fileList: [], //文件列表
      goodsForm: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1, //1是正常2禁用
      },
      rules: {
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" },
        ],
        //二级分类
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
        price: [{ required: true, trigger: "blur", message: "请输入价格" }], //, validator:validatePrice
        //市场价格验证
        market_price: [
          { required: true, trigger: "blur", message: "请输入市场价格" },
        ], //, validator:validatePrice
      },
      formLabelWidth: "120px",
      secondCate: [],
      guige: [],
    };
  },
  mounted() {
    if(this.getCateListAction.length<=0){
      this.getCateListAction();
    }
    if(this.getSpecsListAction.length<=0){
     this.getSpecsListAction(); 
    }
    
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
    changeCate(n) {
      let index = this.getCateList.findIndex(
        (item) => this.goodsForm.first_cateid == item.id
      );
      this.secondCate = this.getCateList[index].children;
            if (!n) {
        this.goodsForm.second_cateid = "";
      }
    },
    changeSpecs(n) {
      let index = this.getSpecsList.findIndex(
        (item) => this.goodsForm.specsid == item.id
      );
      this.guige = this.getSpecsList[index].attrs;
      if(!n){
         this.goodsForm.specsattr = [];
      }
     
    },
    createEditor() {
      this.editor = new E("#editor");
      this.editor.create();
      // this.editor.txt.html(this.goodsForm.description);
      this.editor.txt.html(this.goodsForm.description);
    },
    ...mapActions({
      getGoodsListAction: "goods/getGoodsListAction",
      getCateListAction: "cate/getCateListAction",
      getSpecsListAction: "specs/getSpecsListAction",
      getCountNumAction: "goods/getCountNumAction",
    }),

    cancel() {
      this.$emit("cancel", {
        isShow: false,
        isAdd: this.addInfo.isAdd,
      });
      this.reset();
      this.fileList=[]
    },
    reset() {
      this.goodsForm = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price:0,
        market_price: 0,
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1, //1是正常2禁用
      };
      this.$refs["ruleForm"].resetFields();
    },
    look(id) {
      getGoodsInfo({ id }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.goodsForm = res.data.list;
          this.goodsForm.id = id;
          this.fileList = this.goodsForm.img
            ? [{ url: this.$imgUrl + this.goodsForm.img }]
            : [];
            this.goodsForm.specsattr = res.data.list.specsattr.split(",");
            this.editor.txt.html(this.goodsForm.description);
            this.changeCate(true)
            this.changeSpecs(true)
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.goodsForm.img = this.imgUrl ? this.imgUrl : this.goodsForm.img;
          this.goodsForm.specsattr = this.goodsForm.specsattr
            ? this.goodsForm.specsattr.join(",")
            : "";
          this.goodsForm.description = this.editor.txt.html();
          getGoodsEdit(this.goodsForm).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getGoodsListAction();
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
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.goodsForm.img = this.imgUrl;

          this.goodsForm.specsattr = this.goodsForm.specsattr
            ? this.goodsForm.specsattr.join(",")
            : "";
          this.goodsForm.description = this.editor.txt.html();

          getGoodsAdd(this.goodsForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getGoodsListAction();
              //重新调取总条数
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
      getCateList: "cate/getCateList",
      getSpecsList: "specs/getSpecsList",
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
