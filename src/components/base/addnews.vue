<template>
  <div class="addnews">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动名称" prop="newsName" required>
        <el-input v-model="ruleForm.newsName"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" required>
        <el-col :span="11">
          <el-form-item prop="createDate">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.createDate"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="更新时间" required>
        <el-col :span="11">
          <el-form-item prop="updateDate">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.updateDate"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="新闻内容" required>
        <wangeditor @catchData="catchData"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import wangeditor from "../base/editor"
import { addNews } from "../../api/mh"
import dayjs from 'dayjs'
export default {
  data() {
    return {
      ruleForm: {
        newsName: "",
        createDate: "",
        updateDate: "",
        content:"",
        noticeId:0,
        noticeName:''
      },
      rules: {
        newsName: [{ required: true, message: "请输入新闻名称", trigger: "blur" }],
      },
    };
  },
  components:{
    wangeditor
  },
  mounted(){
    console.log('this.router',this.$route)
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.noticeId = parseInt(this.$route.query.noticeId)
          this.ruleForm.noticeName = this.$route.query.noticeName
          this.ruleForm.createDate = dayjs(this.ruleForm.createDate).format('YYYY-MM-DD')
          this.ruleForm.updateDate = dayjs(this.ruleForm.updateDate).format('YYYY-MM-DD')
          let params = {newList: JSON.stringify(this.ruleForm)}
         
          console.log('params',params)
          addNews(params).then(res => {

          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    catchData(val){
      console.log('valvcalavalval',val)
      this.ruleForm.content=val
    }
  },
};
</script>
<style lang="scss" scoped>
</style>