<template>
  <div class="ind" ref="index-list">
    <el-carousel :interval="4000" type="card" height="500px">
      <el-carousel-item v-for="(item, index) in lunBoList" :key="index">
        <img
          :src="item.picUrl"
          height="100%"
          width="900"
          class="picUrl"
          style
        />
      </el-carousel-item>
    </el-carousel>
    <!--轮播 end-->

    <!--内容 start-->
    <div class="w_news_wrap container">
      <div class="leftNews" v-for="(item, index) in newList" :key="index">
        <div class="titleDiv">{{ item.noticeNewName }}</div>
        <div v-for="(item1, index1) in item.children" :key="index1">
          <div class="newsDiv">
            <div class="newsDate">
              <h3>{{ item1.day }}</h3>
              <span>{{ item1.yearMonth }}</span>
            </div>
            <div class="newsContent">
              <a href="#" v-html="item1.content"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--内容 end-->

    <!--经典项目 start-->
    <div class="indexTitle">
      <h3 class="jdxmName">经典项目</h3>
      <p>Program</p>
    </div>
    <div class="programes container" id="jdxmDiv">
      <ul class="wrap1200 row">
        <li
          class="col-md-4 col-sm-6 col-xs-12"
          v-for="(item, index) in noticeList"
          :key="index"
        >
          <a href="#">
            <img :src="item.picUrl" width="400px" height="200px" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {
  getPictureList,
  getNoticePictureList,
  getMhNew,
} from "../../api/mh.js";
import dayjs from "dayjs";
import bus from "../../utils/bus";
export default {
  data() {
    return {
      lunBoList: [],
      noticeList: [],
      newList: [],
    };
  },
  watch: {
    newList(val) {}
  },
  mounted() {
    this.getLunboList();
    this.getNoticePictureList();
    this.getMhNews();
    bus.$on("on-click", (msg) => {
      console.log("msgmsgmsg", msg);
      this.newList = msg;
    });
  },
  methods: {
    getMhNews() {
      getMhNew().then((res) => {
        this.newList = [];
        console.log(this.newList);
        if (this.newList.length > 0) {
          this.newList.forEach((item) => {
            item.children.forEach((item1) => {
              item1.day = dayjs(item1.updateDate).format("DD");
              item1.yearMonth = dayjs(item1.updateDate).format("YYYY-MM");
            });
          });
        }
      });
    },
    getLunboList() {
      getPictureList().then((res) => {
        this.lunBoList = [];
      });
    },
    getNoticePictureList() {
      getNoticePictureList().then((res) => {
        this.noticeList = [];
      });
    },
  },
};
</script>
<style scoped lang="scss">
.indexTitle {
  text-align: center;
  padding: 30px 0;
  line-height: 1.2;
}
.indexTitle h3 {
  font-size: 30px;
  font-weight: bold;
}
.indexTitle p {
  font-size: 30px;
  font-family: "宋体";
  font-style: italic;
}
.news {
  width: 1240px;
  margin: 0 auto;
}
.news ul li {
  width: 590px;
  height: 60px;
  border-bottom: dotted 1px #5c666e;
  position: relative;
  padding: 30px 0;
  float: left;
  margin-right: 30px;
  margin-bottom: 10px;
}
.news ul li:hover {
  box-shadow: 0 0 5px #ccc;
}
.news ul li:hover .newFont {
  font-weight: bold;
}
.newsGo {
  font-size: 30px;
  position: absolute;
  width: 76px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  color: #999;
  right: 1px;
  bottom: 1px;
}
.news ul li:hover .newsGo {
  background: #e7883a;
  color: #fff;
}
.more {
  width: 132px;
  height: 38px;
  border: solid 1px #bdbdbd;
  display: block;
  margin: 30px auto;
  text-align: center;
  line-height: 38px;
  color: #666;
  font-size: 16px;
}
.loginTitle {
  width: 800px;
  height: 42px;
  border-radius: 3px;
  margin: 0 auto;
}
.loginTitle li {
  float: left;
  width: 30%;
  height: 42px;
  text-align: center;
  line-height: 42px;
  font-size: 18px;
  font-weight: bold;
}
.loginTitle li.cur {
  background: #b01f32;
}
.loginTitle li.cur a {
  color: #fff;
}
.news {
  width: 1240px;
  margin: 0 auto;
  margin-top: 36px;
}
.news ul li {
  width: 590px;
  height: 30px;
  border-bottom: dotted 1px #5c666e;
  position: relative;
  padding: 15px 0;
  float: left;
  margin-right: 28px;
  margin-bottom: 8px;
  margin-left: 2px;
  margin-top: 2px;
}
.news ul li:hover {
  box-shadow: 0 0 5px #ccc;
}
.xinwen {
  background: #f6f6f6;
  padding-bottom: 30px;
}
.xinwen dl {
  float: left;
  width: 623px;
  height: 312px;
}
.xinwen dl dt {
  position: relative;
}
.xinwen dl dt b {
  position: absolute;
  width: 603px;
  padding: 0 10px;
  height: 56px;
  line-height: 56px;
  background: url("../../assets/images/filter5.png") repeat;
  left: 0;
  bottom: 0;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
}
.xinwen ul {
  float: right;
  width: 502px;
}
.xinwen ul li {
  border-bottom: dashed 1px #5c5c5c;
  padding: 18px 0;
}
.data {
  width: 70px;
  line-height: 1.1;
}
.data h3 {
  font-size: 48px;
  color: #555;
}
.data p {
  font-size: 14px;
  color: #999;
}
.newsRight {
  width: 415px;
  padding-top: 5px;
}
.newsRight h3 {
  margin-bottom: 10px;
}
.newsRight h3 a {
  font-size: 14px;
  color: #444;
}
.newsRight p {
  color: #777;
  font-size: 14px;
}
.banerImg {
  height: 373px;
  background: url("../../assets/images/im_02.jpg") no-repeat center;
}
.banerImg ul li {
  float: left;
  width: 16.66%;
  height: 373px;
  text-align: center;
  color: #fff;
}
.iconBtn {
  width: 150px;
  height: 29px;
  line-height: 28px;
  border: solid 1px #2565a6;
  border-radius: 20px;
  overflow: hidden;
  background: #fff;
  margin: 22px auto;
  display: none;
}
.iconBtn a {
  width: 94px;
  font-size: 15px;
  color: #2565a6;
  font-weight: bold;
}
.banerImg ul li:hover {
  background: url("../../assets/images/filter2.png") repeat;
}
.banerImg ul li:hover .iconBtn {
  display: block;
}
.banerImg ul li h3 {
  font-size: 24px;
  font-weight: bold;
}
.banerImg ul li p {
  font-size: 14px;
}
.icon01 {
  display: block;
  width: 90px;
  height: 90px;
  background: url("../../assets/images/icons.png") no-repeat left -5px;
  margin: 116px auto 10px auto;
}
.icon02 {
  display: block;
  width: 88px;
  height: 90px;
  background: url("../../assets/images/icons.png") no-repeat -253px -7px;
  margin: 116px auto 10px auto;
}
.icon03 {
  display: block;
  width: 78px;
  height: 90px;
  background: url("../../assets/images/icons.png") no-repeat -484px -13px;
  margin: 116px auto 10px auto;
}
.icon04 {
  display: block;
  width: 88px;
  height: 90px;
  background: url("../../assets/images/icons.png") no-repeat -728px -19px;
  margin: 116px auto 10px auto;
}
.icon05 {
  display: block;
  width: 76px;
  height: 90px;
  background: url("../../assets/images/icons.png") no-repeat right -18px;
  margin: 116px auto 10px auto;
}
.icon06 {
  display: block;
  width: 88px;
  height: 90px;
  background: url("../../assets/images/old.png") no-repeat center top;
  margin: 116px auto 10px auto;
}
.programes {
  margin-bottom: 20px;
}
.programes ul li {
  float: left;
  height: 200px;
}
.newsImg {
  height: 505px;
  background: url("../../assets/images/newsImg.jpg") no-repeat;
}
.xmImg {
  height: 505px;
  background: url("../../assets/images/xm.jpg") no-repeat;
}
.crums {
  width: 100%;
  height: 55px;
  background: url("../../assets/images/filter5.png") repeat;
  top: -55px;
  position: relative;
  line-height: 55px;
  color: #fff;
  font-size: 18px;
}
.crums a {
  color: #fff;
}
.home {
  display: inline-block;
  width: 26px;
  height: 24px;
  background: url("../../assets/images/home.png") no-repeat;
  vertical-align: middle;
  margin-right: 20px;
}
.main {
  background: url("../../assets/images/main.jpg") repeat-y left;
  position: relative;
  top: -20px;
}
.leftSide {
  width: 260px;
}
.leftSide li {
  margin: 0 20px;
  border-bottom: solid 1px #d1d1d1;
  height: 69px;
  font-size: 18px;
  font-weight: bold;
  padding-left: 20px;
}
.leftSide li a {
  display: block;
  line-height: 69px;
  height: 69px;
}
.leftSide li a i {
  font-size: 24px;
  float: right;
  margin-left: 30px;
  display: none;
}
.leftSide li a:hover,
.leftSide li.cur a {
  color: #860c1c;
}
.leftSide li a:hover i,
.leftSide li.cur a i {
  display: block;
}
.rightSide {
  width: 900px;
}
.newsList li {
  padding: 30px 0;
  border-bottom: dotted 1px #333;
  overflow: hidden;
}
.newsFont {
  width: 810px;
}
.newsFont h3 {
  font-size: 16px;
  padding: 5px 0 10px 0;
}
.newsFont p {
  font-size: 14px;
  color: #777;
}
.pages {
  margin: 50px auto;
  text-align: center;
}
.pages a,
.pages span {
  display: inline-block;
  width: 50px;
  height: 50px;
  vertical-align: middle;
  text-align: center;
  line-height: 50px;
  border-radius: 100%;
  font-size: 22px;
}
.pages a:hover,
.pages a.current {
  background: #9e141c;
  color: #fff;
}
.pages span.prev {
  background: url("../../assets/images/prev.png") no-repeat;
}
.pages span.next {
  background: url("../../assets/images/next.png") no-repeat;
}
.detaileTitle {
  border-bottom: dotted 1px #333;
  padding: 25px 0;
  text-align: center;
}
.detaileTitle h1 {
  font-size: 24px;
  color: #444;
  margin-bottom: 10px;
}
.detaileTitle p {
  font-size: 14px;
  color: #999;
}
.detailCOn {
  padding: 30px 0;
  font-size: 16px;
  line-height: 30px;
}
.detailCOn p {
  text-indent: 2em;
  margin-bottom: 30px;
}
.detailcz {
  text-align: center;
}
.detailcz a {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin: 0 10px;
}
.detailcz a.print {
  background: url("../../assets/images/print.png") no-repeat;
}
.detailcz a.yj {
  background: url("../../assets/images/yj.png") no-repeat;
}
.articlePage {
  border-top: dashed 1px #333;
  border-bottom: dashed 1px #333;
  margin: 30px 0;
  padding: 10px 0;
  font-size: 16px;
}
.articlePage p {
  padding: 10px 0;
}
.reback {
  display: block;
  width: 134px;
  height: 40px;
  background: #a5151c;
  line-height: 40px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  margin: 60px auto;
}
.w_news_wrap {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  .leftNews {
    width: 50%;
    height: 300px;
    margin-right: 10px;
    .titleDiv {
      font-size: 20px;
      font-weight: bold;
    }
    .newsDiv {
      width: 100%;
      height: 60px;
      border-bottom: 1px #999 dashed;
      margin-top: 10px;
      display: flex;
      position: relative;
      .newsDate {
        width: 15%;
        border-right: 1px black solid;
        height: 90%;
        text-align: center;
        position: relative;
        h3 {
          color: #000;
          position: absolute;
          left: 32%;
          top: 10%;
          font-size: 22px;
          font-weight: bold;
        }
        span {
          color: #000;
          position: absolute;
          left: 20%;
          top: 60%;
        }
      }
      .newsContent {
        a {
          color: #000;
          position: absolute;
          margin-left: 10px;
          top: 55%;
          transform: translateY(-50%);
          font-size: 14px;
        }
      }
    }
  }
  .rightNews {
    width: 50%;
    height: 300px;
    background: red;
  }
}
.w_more_wrap {
  margin-top: 20px;
  margin-right: 30px;
}
.w_more_wrap .more {
  width: 132px;
  height: 38px;
  display: block;
  text-align: center;
  line-height: 38px;
  color: #666;
  font-size: 16px;
}
.w_news_l .w_news_head {
  margin-bottom: 40px;
}
.w_news_l .w_news_head h3 {
  font-size: 30px;
  color: #333;
  font-weight: bold;
}
.w_news_l .w_news_head p {
  font-size: 30px;
  color: #333;
  font-style: italic;
  font-weight: normal;
}

.w_new_list .newsGo {
  font-size: 30px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  color: #999;
  font-weight: bold;
  display: block;
}
.w_new_list ul li:hover .newsGo {
  background: #666;
  color: #fff;
}
</style>