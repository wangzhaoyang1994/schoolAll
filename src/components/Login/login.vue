<template>
  <div class="all-content">
    <top-list />
    <index-list />
    <footer-list />
    <tanchuang-info :isshow="showthis"/>
    <tanchuang-zhuce :iszhuce="showzhuce" />
  </div>
</template>
<script>
import topList from "./top-list";
import indexList from "./index-list";
import footerList from "./footer-list";
import tanchuangInfo from "./tanchuang-info";
import tanchuangZhuce from "./tanchuang-zhuce"
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../../node_modules/bootstrap/dist/js/bootstrap";
export default {
  data() {
    return {
      showthis:false,
      showzhuce:false
    };
  },
  components: {
    topList,
    indexList,
    footerList,
    tanchuangInfo,
    tanchuangZhuce
  },
};
</script>
<style>
.all-content{
  position: relative;
  z-index: 1;
}

body {
  font: 12px/1.5 MIcrosoft YaHei, Arial, Helvetica, sans-serif;
  color: #333;
}
table {
  width: 100%;
  border-collapse: collapse;
  border: none;
  border-spacing: 0;
}
a {
  color: #202020;
  text-decoration: none;
}
img {
  border: none;
}
input {
  vertical-align: middle;
  outline: none;
}
textarea {
  outline: none;
}
ul,
ol,
dl {
  list-style: none;
}
b,
em,
i,
u,
strong {
  font-weight: normal;
  font-style: normal;
  text-decoration: none;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 14px;
  font-weight: normal;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix {
  overflow: hidden;
  zoom: 1;
}
.clear {
  clear: both;
}
.clearf:after {
  content: "020";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
</style>