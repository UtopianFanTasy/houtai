<template>
  <div>
    <el-dialog
      center
      :before-close="cancel"
      :title="addInfo.isAdd ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="addInfo.isShow"
    >
      <el-form :model="seckForm" :rules="rules" ref="ruleForm">
        <el-form-item
          prop="title"
          label="活动名称："
          :label-width="formLabelWidth"
        >
          <el-input v-model="seckForm.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动期限：" :label-width="formLabelWidth">
          <el-date-picker
            v-model="timer"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="一级分类">
          <el-select
            v-model="seckForm.first_cateid"
            @change="changeCate(false)"
          >
            <el-option value label="请选择" disabled></el-option>
            <!-- 调取商品分类的列表接口 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="二级分类">
          <el-select
            v-model="seckForm.second_cateid"
            @change="changeGoods(false)"
          >
            <!-- 二级分类一定是根据一级分类选择之后的联动信息 -->
            <el-option value label="请选择" disabled></el-option>
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="商品">
          <el-select v-model="seckForm.goodsid">
            <!-- 二级分类一定是根据一级分类选择之后的联动信息 -->
            <el-option
              v-for="item in goodsArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            >
            </el-option>
            <el-option value label="请选择" disabled></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="seckForm.status"
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
import {
  getSeckAdd,
  getSeckEdit,
  getSeckInfo,
  getGoodsList,
} from "../../util/axios";
export default {
  data() {
    return {
      seckForm: {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1, //状态1正常2禁用
      },
      timer: "", //日期
      //创建一个二级分类数据
      secondArr: [],
      goodsArr: [], //商品数组
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
    this.getCateListAction();
  },
  props: ["addInfo"],
  methods: {
    ...mapActions({
      getCateListAction: "cate/getCateListAction",
      getSeckListAction: "miao/getSeckListAction",
    }),
    changeCate(n) {
      //查找与catelist符合的一级分类所在的索引
      let index = this.cateList.findIndex(
        (item) => this.seckForm.first_cateid == item.id
      );
      //二级分类数组赋值
      this.secondArr = this.cateList[index].children;
      //清空二级分类双向数据绑定
      if (!n) {
        this.seckForm.second_cateid = "";
        this.seckForm.goodsid = "";
      }
    },
    //封装一个切换商品的事件
    changeGoods(n) {
      //调取商品接口列表
      getGoodsList({
        fid: this.seckForm.first_cateid,
        sid: this.seckForm.second_cateid,
      }).then((res) => {
        console.log(res, "商品联动列表");
        if (res.data.code == 200) {
          this.goodsArr = res.data.list ? res.data.list : [];
        }
      });
      if (!n) {
        this.seckForm.goodsid = "";
      }
    },
    cancel() {
      this.$emit("cancel", {
        isShow: false,
        isAdd: this.addInfo.isAdd,
      });
      this.reset();
    },
    reset() {
      this.seckForm = {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1, //状态1正常2禁用
      };
      this.secondArr = [];
      this.goodsArr = [];
      this.timer = "";
      this.$refs["ruleForm"].resetFields();
    },
    look(id) {
      getSeckInfo({ id }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
        
          this.seckForm=res.data.list
          this.seckForm.id = id
          
          this.timer = [new Date(parseFloat(this.seckForm.begintime)),new Date(parseFloat(this.seckForm.endtime))]
          this.changeCate(true)
          this.changeGoods(true)
        }
      });
    },
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getSeckEdit(this.seckForm)
          .then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getSeckListAction();
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
          this.seckForm.begintime = new Date(this.timer[0]).getTime();
          this.seckForm.endtime = new Date(this.timer[1]).getTime();
          getSeckAdd(this.seckForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getSeckListAction();
              console.log(this.seckForm);
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
      getSeckList: "miao/getSeckList",
      cateList: "cate/getCateList",
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
