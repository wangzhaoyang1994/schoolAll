<template>
  <div class="xwgl">
    <el-button type="primary" icon="el-icon-plus" @click="addNews">添加新闻</el-button>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item,index) in noticeList"
        :label="item.noticeNewName"
        :name="item.id+''"
        :key="index"
      ></el-tab-pane>
    </el-tabs>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="(item1,index) in headData"
        :key="index"
        :prop="item1.prop"
        :label="item1.lable"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getNoticeNewList, getNewsList } from "../../api/mh";
import dayjs from "dayjs";
export default {
  data() {
    return {
      activeName: "",
      noticeId: 0,
      noticeName: "",
      noticeList: [],
      tableData: [],
      headData: [
        { prop: "newName", lable: "新闻名称" },
        { prop: "updateDate", lable: "更新时间" },
      ],
    };
  },
  mounted() {
    this.getNoticeNewList(0);
  },
  methods: {
    handleClick(val) {
      this.noticeName = val.label;
      this.noticeId = parseInt(val.name);
      console.log("tab", val.label);
      console.log("event", val.name);
      this.getNoticeNewList(this.noticeId, this.noticeName);
    },
    getNoticeNewList(val, val1) {
      getNoticeNewList().then((res) => {
        this.noticeList = res.data.slice(0, 2);
        let params;
        if (val == 0) {
          this.activeName = this.noticeList[0].id + "";
          this.noticeName = this.noticeList[0].noticeNewName;
          this.noticeId = parseInt(this.noticeList[0].id);
          params = {
            noticeId: this.noticeId,
          };
        } else {
          this.activeName = val + "";
          this.noticeName = val1;
          this.noticeId = val;
          params = {
            noticeId: val,
          };
        }
        getNewsList(params).then((res) => {
          this.$nextTick(() => {
            this.tableData = res.data;
            this.tableData.forEach((item) => {
              item.updateDate = dayjs(item.updateDate).format("YYYY-MM-DD");
            });
          });
        });
      });
    },
    addNews() {
      this.$router.push({
        name: "addnews",
        query: { noticeId: this.noticeId, noticeName: this.noticeName },
      });
    },
  },
};
</script>
<style scoped lang="scss">
.xwgl /deep/ .el-button {
  margin-bottom: 20px;
}
</style>