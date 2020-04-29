<template>
  <div class="model-list" v-show="showt">
    <div class="model-list-content">
      <a href="javascript:void(0);" @click="closeWindow()">
        <img :src="imgsrc" :height="height" class="imgcl" />
      </a>
      <div class="demo-input-suffix">
        用户名：
        <el-input placeholder="请输入用户名">
          <i slot="prefix" class="el-input__icon el-icon-s-custom"></i>
        </el-input>
      </div>
      <div class="demo-input-suffix">
        密&nbsp;&nbsp;&nbsp;码：
        <el-input placeholder="请输入密码">
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </div>
      <div class="demo-input-suffix three">
        验证码：
        <el-input placeholder="请输入验证码">
          <i slot="prefix" class="el-input__icon el-icon-bell"></i>
        </el-input>
        <img :src="yzm" class="yzmImg" @click="imgVal()" />
      </div>
      <div class="forbut">
        <el-row>
          <el-button type="primary" round>登录</el-button>
          <el-button type="info" round>取消</el-button>
        </el-row>
      </div>
      <p v-text="testVal"></p>
      <p v-text="testVal"></p>
    </div>
  </div>
</template>
<script>
import imgUrl from "../../assets/images/close.jpg";
import { changVerify, niHao, testParam } from "../../api/verifyCode";
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
      nihao: "",
      testVal: ""
    };
  },
  watch: {
    isshow: function(val) {
      this.showt = val;
    }
  },
  mounted: function() {
    this.imgVal();
    this.hao();
    this.testP();
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
    hao() {
      niHao().then(re => {
        this.nihao = re.data;
      });
    },
    testP() {
      let params = {
        id: 1
      };
      testParam(params).then(re => {
        this.testVal = re.data;
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