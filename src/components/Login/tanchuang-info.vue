<template>
  <div class="model-list" v-show="showt">
    <div class="model-list-content">
      <a href="javascript:void(0);" @click="closeWindow()">
        <img :src="imgsrc" :height="height" class="imgcl" />
      </a>
      <div class="demo-input-suffix">
        用户名：
        <el-input placeholder="请输入用户名" class="userName" v-model="userName">
          <i slot="prefix" class="el-input__icon el-icon-s-custom"></i>
        </el-input>
      </div>
      <div class="demo-input-suffix">
        密&nbsp;&nbsp;&nbsp;码：
        <el-input placeholder="请输入密码" class="passWord" v-model="passWord">
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </div>
      <div class="demo-input-suffix three">
        验证码：
        <el-input placeholder="请输入验证码" class="verCode" v-model="verCode">
          <i slot="prefix" class="el-input__icon el-icon-bell"></i>
        </el-input>
        <img :src="yzm" class="yzmImg" @click="imgVal()" />
      </div>
      <div class="forbut">
        <el-row>
          <el-button type="primary" round @click="register">登录</el-button>
          <el-button type="info" round>取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import imgUrl from "../../assets/images/close.jpg";
import { changVerify } from "../../api/verifyCode";
import { userLogin } from "../../api/UserLogin";
export default {
  props: {
    isshow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      imgsrc: imgUrl,
      height: 20,
      showt: this.isshow,
      yzm: "",
      userName: "",
      passWord: "",
      verCode: ""
    };
  },
  watch: {
    isshow: function(val) {
      this.showt = val;
    }
  },
  mounted: function() {
    this.imgVal();
  },
  methods: {
    closeWindow() {
      this.$parent.showthis = false; //这里不能直接this.showt=false;(不能给这个变量一个确定的参数，要不然父组件传来的值不能起作用，要通过watch来监听父组件的值),所以要改变父组件的值
    },
    imgVal() {
      const baseUrl = process.env.BASE_API;
      var date = new Date().getTime();
      this.yzm = baseUrl + "/verify/getVerify?" + date; //不缓存
    },
    register() {
      const userName = this.userName;
      const passWord = this.passWord;
      const verCode = this.verCode;
      const status = false;
      const baseUrl = process.env.BASE_API;
      if (userName == "") {
        alert("请输入用户名");
        return status;
      }
      if (passWord == "") {
        alert("请输入密码");
        return status;
      }
      if (verCode == "") {
        alert("请输入验证码");
        return status;
      }
      this.$axios
        .get(baseUrl + "/login/register", {
          // 还可以直接把参数拼接在url后边
          params: {
            userName: userName,
            passWord: passWord,
            verCode: verCode
          }
        })
        .then(res=> {
          if (!res.data.status && res.data.error == 1) {
            this.$toast(res.data.msg);
          }
          if (!res.data.status && res.data.error == 2) {
            this.$toast(res.data.msg);
          }
          if (!res.data.status && res.data.error == 3) {
            this.$toast(res.data.msg);
            this.imgVal();
          }
          if (res.data.status && res.data.error == 0) {
            this.$toast(res.data.msg);
            this.$router.push({
              path:'/ht'
            })
          }
        })
        .catch(function(error) {
          console.log(error);
        });
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
.model-list-content .three /deep/ .el-input {
  width: 45%;
}
</style>