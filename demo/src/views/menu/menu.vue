<template>
  <div>
     <el-bread-i></el-bread-i>
    <el-button @click="toOpen" type="primary" plain size="medium">添加</el-button>
    <a-dd ref="vAdd" @cancel="cancel" :addInfo='addInfo'></a-dd>
    <v-table @edit="edit"></v-table>
    
  </div>
</template>

<script>
import vTable from './list'
import aDd from './add'
export default {
  data() {
    return {
      addInfo:{
         isShow:false,
         isAdd:true
      }
     
    };
  },
  components:{
      vTable,
      aDd
  },
  methods: {
    toOpen(){
      this.addInfo.isShow= true
      this.addInfo.isAdd= true
    },
    cancel(e){
      console.log(e);
      this.addInfo = e
    },
    edit(e){
      this.addInfo.isShow= true;
      this.addInfo.isAdd=false
      this.$refs.vAdd.look(e)
    }
  },
};
</script>

<style lang="stylus" scoped>


</style>
