<template>
  <div class="xwflgl">
    <el-button type="primary" icon="el-icon-plus" @click="addNewNotice">添加新闻分类</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="(item,index) in headData"
        :key="index"
        :prop="item.prop"
        :label="item.label"
      ></el-table-column>
    </el-table>
    <el-dialog title="添加新闻分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="新闻分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="更新时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.updateDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addSure, getNoticeNewList } from "../../api/mh.js";
import dayjs from "dayjs"
export default {
  data() {
    return {
      headData: [
        {
          prop: "noticeNewName",
          label: "新闻分类名称"
        },
        {
          prop: "updateDate",
          label: "日期"
        }
      ],
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        name: "",
        updateDate: ""
      }
    };
  },
  mounted(){
      this.getNoticeNewList()
  },
  methods: {
    addNewNotice() {
      this.form.name = "";
      this.form.updateDate = "";
      this.dialogFormVisible = true;
    },
    addSure() {
      let param = {
        name: this.form.name,
        updateDate: this.form.updateDate
      };
      addSure(param).then(res => {
          this.$toast("添加成功")
          this.getNoticeNewList()
      });
      this.dialogFormVisible = false;
    },
    getNoticeNewList(){
        getNoticeNewList().then(res => {
            res.data.forEach(item => {
                item.updateDate = dayjs(item.updateDate).format("YYYY-MM-DD")
            })
            this.tableData=res.data
        })
    }
  }
};
</script>
<style scoped>
</style>