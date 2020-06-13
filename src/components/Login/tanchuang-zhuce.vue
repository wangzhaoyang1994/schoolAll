<template>
  <div class="model-list" v-show="showzhuce">
    <div class="model-list-content">
      <a href="javascript:void(0);" @click="closeWindow()">
        <img :src="imgsrc" :height="height" class="imgcl" />
      </a>
      <div class="demo-input-suffix">
        用户名：
        <el-input placeholder="请输入用户名" class="userName" v-model="userName">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </div>
      <div class="demo-input-suffix">
        密&nbsp;&nbsp;&nbsp;码：
        <el-input placeholder="请输入密码" class="passWord" v-model="passWord">
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </div>
      <div class="demo-input-suffix">
        角&nbsp;&nbsp;&nbsp;色:
        <el-select v-model="role" placeholder="请选择角色">
          <i slot="prefix" class="el-input__icon el-icon-s-custom"></i>
          <el-option label="管理员" value="admin"></el-option>
          <el-option label="教师" value="teacher"></el-option>
          <el-option label="学生" value="student"></el-option>
        </el-select>
      </div>
      <div class="forbut">
        <el-row>
          <el-button type="primary" round @click="forzhuce">注册</el-button>
          <el-button type="info" round @click="cancle">取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import imgUrl from "../../assets/images/close.jpg";
import { userZc } from "../../api/UserLogin";
export default {
  props: {
    iszhuce: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      imgsrc: imgUrl, //关闭按钮
      height: 20,
      showzhuce: this.iszhuce,
      userName: "",
      passWord: "",
      role:""
    };
  },
  watch: {
    iszhuce: function(val) {
      this.showzhuce = val;
    }
  },
  mounted: function() {},
  methods: {
    forzhuce() {
      const userName=this.userName
      const passWord=this.passWord
      const role=this.role
      const status = false
      if (userName == "") {
        alert("请输入用户名");
        return status;
      }
      if (passWord == "") {
        alert("请输入密码");
        return status;
      }
      if (role == "") {
        alert("请选择角色");
        return status;
      }
      let params={
        userName:this.userName,
        passWord:this.passWord,
        role:this.role
      }
      userZc(params).then(re => {
        if(re.data == 1){
          this.$toast('注册成功')
        }else{
          this.$toast('注册失败')
        }
        this.closeWindow()
      })
    },
    cancle(){
      this.closeWindow()
    },
    closeWindow() {
      this.$parent.showzhuce = false; //这里不能直接this.showt=false;(不能给这个变量一个确定的参数，要不然父组件传来的值不能起作用，要通过watch来监听父组件的值),所以要改变父组件的值
    }
  }
};
</script>
<style lang="scss" scoped>
.model-list {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  top: 0; //这个是关键，如果没有这个，弹窗就会在最下层，加上这个，弹窗会在顶部
  .model-list-content {
    position: relative;
    top: 10%;
    left: 35%;
    width: 500px;
    height: 330px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 20px 2px rgba(255, 255, 255, 0.7);
    border-radius: 2px;
    .imgcl {
      position: absolute;
      right: 2%;
      top: 2%;
    }
  }
  .forbut {
    text-align: center;
    padding-top: 30px;
  }
}
.model-list-content /deep/ .el-input {
  width: 70%;
}
.model-list-content /deep/ .demo-input-suffix {
  padding: 20px;
}
.model-list-content /deep/ .el-select{
  width: 80%;
  left: 2%;
}
</style>