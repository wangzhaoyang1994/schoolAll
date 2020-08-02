<template>
  <div class="xwgl">
    <el-button type="primary" icon="el-icon-plus" @click="addNews">添加新闻</el-button>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        :label="item.noticeNewName"
        :name="item.id+''"
        v-for="(item,index) in noticeList"
        :key="index"
      >
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            v-for="(item,index) in headData"
            :key="index"
            :prop="item.prop"
            :label="item.label"
          ></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getNoticeNewList,getNewsList } from "../../api/mh";
export default {
  data() {
    return {
      activeName: "1",
      noticeId:0,
      noticeName:'',
      noticeList: [],
      tableData: [],
      headData: [
        { prop: "newsName", lable: "新闻名称" },
        { prop: "updateDate", lable: "更新时间" },
      ],
    };
  },
  mounted() {
    this.getNoticeNewList();
    this.getNewsList();
  },
  methods: {
    handleClick(val) {
      this.noticeName = val.label
      this.noticeId = parseInt(val.name)
      console.log("tab", val.label);
      console.log("event", val.name);
    },
    getNoticeNewList() {
      getNoticeNewList().then((res) => {
        this.noticeList = res.data.slice(0, 2);
        this.noticeName = this.noticeList[0].noticeNewName
        this.noticeId = this.noticeList[0].id
      });
    },
    getNewsList(){
        getNewsList().then(res => {
            this.tableData = res.data
        })
    },
    addNews(){
        this.$router.push({
            name:"addnews",
            query:{noticeId:this.noticeId,noticeName:this.noticeName}
        })
    }
  },
};
</script>
<style scoped lang="scss">
.xwgl /deep/ .el-button{
    margin-bottom: 20px;
}
</style>