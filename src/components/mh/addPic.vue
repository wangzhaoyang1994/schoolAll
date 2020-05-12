<template>
<div class="addPic">
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="标题">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="图片">
   <el-button type="success" @click="onPickFile()">选择图片</el-button>
   <input 
    type="file" 
    ref="fileInput" 
    accept="image/*" 
    @change="getFile"
    style="display: none"
   ></input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">保存</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      onPickFile(){
      	this.$refs.fileInput.click();
      },
      getFile(){
      	console.log("getFile");
      }
    }
  }
</script>

<style scoped="scoped">
.addPic{
	position: relative;
}
.addPic /deep/ .el-input{
	width: 27%;
	display: block;
}
.addPic /deep/ .el-button--success{
	display: block;
}
.addPic /deep/ .el-button--default{
	position: absolute;
	left:100px
}
.addPic /deep/ .el-button--primary{
	position: absolute;
	left:0
}
</style>