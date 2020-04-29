<template>
  <div class="top">
    <div class="header">
      <div class="wrap1200 w_cont">
        <a href="#" class="fl logo"></a>
        <div class="fr w_head_r">
          <div class="phoneNum fl">
            <p>
              服务热线：
              <span>17334086182</span>
            </p>
            <p>
              外呼显示：
              <span>0312-6379854</span>
            </p>
          </div>
          <div class="search fl">
            <input type="text" class="searchInp fl" placeholder />
            <input type="submit" class="searchSub" value />
          </div>
          <div class="beforeLogin fl">
            <a href="#" class="KKWZ" @click="forLogin()">
              <b>登录</b>
            </a>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
    <div class="nav">
      <div class="wrap1200 w_cont">
        <div class="navbar-header w_nav_bar">
          <button
            type="button"
            class="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar"
            aria-expanded="false"
            aria-controls="navbar"
          >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="./">山东大学继续网络教育学院</a>
        </div>
        <div class="w_nav_list">
          <ul class="clearf" style="width:100%">
            <li class="cur">
              <a href="#">首页</a>
            </li>
            <li class="aboutUs">
              <a href="#">关于我们</a>
            </li>
            <li class="aboutUs">
              <a href="#">学院简介</a>
              <div class="secondMenu">
                <a href="#">测试1</a>
                <a href="#">测试2</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{}
  },
methods:{
  forLogin(){
    this.$parent.showthis=true;
  }
}
};
</script>
<style scoped>
.header{min-height:106px;background-color:white;}
.logo{margin-top:18px;background: url('../../assets/images/logo.jpg') no-repeat;width: 474px;height: 74px;display: inline-block;}
.beforeLogin{margin-top:35px;height:33px;line-height:33px;padding-right:30px;color:#d9d9d9;font-size:16px}
.beforeLogin a{margin:0 5px}
.search{width:238px;height:33px;background:#f2f2f2;margin-top:35px;border-radius:15px;margin-right:10px;overflow:hidden;margin-left: 30px;}
.searchInp{border:none;background:none;padding:0 10px;width:200px;height:33px;line-height:33px}
.searchSub{background:url('../../assets/images/topZoom.png') no-repeat center;width:33px;height:33px;border:none;cursor:pointer}
.nav{background:#860c1c;color:#fff;position:relative;z-index:9}
.nav ul li{float:left;line-height:50px;}
.nav ul li a{display:inline-block;padding:0 36px;font-size:16px;color:#fff;font-weight:bold;text-decoration:none}
.nav ul li.cur a{font-size:18px}
.secondMenu{position:absolute;width:143px;background:#fff;border-radius:0 0 5px 5px;top:48px;display:none;z-index:99}
.nav ul li.aboutUs .secondMenu a{display:block;background:none;color:#333;width:133px;font-size:16px;font-weight:normal;height:49px;line-height:49px;border-top:solid 1px #a4a4a4;margin:0 5px;padding:0;text-align:center;border-radius:0}
.nav ul li.aboutUs .secondMenu a:hover{color:#860c1c}
.nav ul li.aboutUs:hover .secondMenu{display:block}
.phoneNum{font-size:14px;padding-top:30px;}
.phoneNum span{font-weight:bold}
.w_cont{max-width: 1200px;margin: 0 auto;}
.navbar-toggle .icon-bar {background: #fff;}
.navbar-toggle{border-color: #fff!important;}
.navbar-brand {color: #fff}
.w_nav_list{position: relative;height: 50px;}
.w_nav_bar{display: none}
</style>