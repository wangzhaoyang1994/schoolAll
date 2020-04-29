<template>
  <div class="fot">
    <div class="friendship">
      <div class="wrap1200 clearfix container">
        <span class="fl link">友情链接:</span>
        <div class="fl linkRight">
          <a href="#">测试1</a>
          <a href="#">测试2</a>
          <a href="#">测试3</a>
          <a href="#">测试4</a>
          <a href="#">测试5</a>
          <a href="#">测试6</a>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="clearfix wrap1200 container" style="margin:0 auto;width:1170px">
        <ul class="fl w_email_wrap">
          <li>
            <i class="email"></i>
            <span>邮编：</span>071000
          </li>
          <li>
            <i class="address"></i>
            <span>地址：</span>河北省保定市
          </li>
          <li>
            <i class="hotLine"></i>
            <span>电话：</span>15099999999
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.footer {
  background: #920e15;
  padding-top: 10px;
  padding-bottom: 30px;
  padding-left: 5px;
  padding-right: 5px;
}
.footer dl {
  width: 84px;
  height: 109px;
  margin-left: 24px;
  margin-top: 25px;
  background: #fff;
  float: right;
}
.footer dl dt {
  width: 74px;
  height: 74px;
  margin: 5px auto;
}
.footer dl dd {
  font-size: 14px;
  text-align: center;
}
.footer ul li {
  height: 40px;
  line-height: 40px;
  color: #fff;
  font-size: 14px;
}
.footer ul li span {
  font-weight: bold;
}
.footer ul li i {
  float: left;
  height: 40px;
  width: 26px;
  margin-right: 10px;
}
.hotLine {
  background: url('../../assets/images/hotLine.png') no-repeat center;
}
.email {
  background: url('../../assets/images/email.png') no-repeat center;
}
.address {
  background: url('../../assets/images/address.png') no-repeat center;
}
.w_foot_text {
  text-align: right;
  font-size: 14px;
  color: #fff;
  padding-top: 10px;
}
.friendship {
  background: #920e15;
  padding: 50px 0 20px 0;
  border-bottom: solid 1px #a53d45;
  color: #fff;
  font-size: 14px;
}
.link {
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background: url('../../assets/images/link.png') no-repeat left center;
  height: 30px;
  line-height: 30px;
  padding-left: 36px;
}
.linkRight {
  color: #a53d45;
}
.linkRight a {
  font-size: 14px;
  color: #fff;
  margin: 0 10px;
  height: 30px;
  line-height: 30px;
}
</style>