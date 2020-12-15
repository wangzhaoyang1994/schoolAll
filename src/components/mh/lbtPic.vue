<template>
  <div class="yhgl-list">
    <el-button type="success" @click="addPic">添加图片</el-button>
    <el-button type="success" @click="exportExcel">导出excel</el-button>
    <el-button type="danger" @click="clearData">清除缓存数据</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="(item,index) in headData"
        :key="index"
        :prop="item.prop"
        :label="item.label"
      >
        <template slot-scope="scope">
          <img
            :src="scope.row[scope.column.property]"
            v-if="scope.column.property == 'picUrl'"
            width="30px"
            height="30px"
          />
          <span v-else>{{scope.row[scope.column.property]}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="上传图片" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="图片名称" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-input v-model="form.pictureAddress" type="hidden"></el-input>
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            name="userImg"
            :limit="1"
            :action="uploadUrl()"
            :on-success="successHandle"
            :before-upload="beforeUpload2"
            accept="image/jpeg, image/jpg, image/png"
            ref="uploadpic"
          >
            <img :src="userimgV" width="25px" />
            <el-button type="primary">
              <i class="el-icon-upload el-icon--left"></i>上传
            </el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOnlyPic">确 定</el-button>
      </div>
    </el-dialog>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getPicListByPage, addPic,exportExcel,clearData } from "../../api/Picture";
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      currentPage: 1,
      pageSizes: [5, 10, 15, 20],
      pageSize: 5,
      total: 0,
      userimgV: "",
      form: {
        name: "",
        pictureAddress: "",
        lastPage:0
      },
      formLabelWidth: "120px",
      headData: [
        {
          prop: "picName",
          label: "图片名称"
        },
        {
          prop: "picUrl",
          label: "图片"
        }
      ]
    };
  },
  mounted: function() {
    this.getPicListByPage();
  },
  methods: {
    uploadUrl() {
      var uUrl = process.env.BASE_API + "/file/upload";
      return uUrl;
    },
    clearData(){
      clearData().then(res => {
        this.$toast("清除成功");
      })
    },
    addPic() {
      this.form.name=""
      this.form.pictureAddress=""
      this.userimgV=""
      this.dialogFormVisible = true;
    },
    getPicListByPage() {
      let params = {
        current: this.currentPage,
        pageSize: this.pageSize
      };
      getPicListByPage(params).then(res => {
          this.tableData=res.data.picList.list
          this.total=res.data.picList.total
          this.form.lastPage=res.data.picList.lastPage
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPicListByPage();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPicListByPage();
    },
    successHandle(res, file) {
      if (file.response.code == 200) {
        this.$toast(file.response.msg);
        this.form.pictureAddress = file.response.path;
        this.userimgV = file.response.path;
      }
    },
    beforeUpload2(file) {
      const isLt2M = file.size < 1024 * 1024 * 50;
      if (!isLt2M) {
        this.$toast("上传文件大小不能超过 50MB!");
      }
    },
    addOnlyPic() {
      var params = this.form;
      addPic(params).then(res => {
        if (res.data == 1) {
          this.dialogFormVisible=false
          this.$toast("添加成功");
          this.getPicListByPage();
          this.$refs.uploadpic.clearFiles(); //上传完成之后，清空之前的图片列表
        }
      });
    },
    exportExcel(){
      location.href=process.env.BASE_API + "/pic/exportExcel?current="+this.currentPage+"&pageSize="+this.pageSize; //图片到处必须用location.href ，不能使用ajax，文件导出相当于打开了一个新页面
    }
  }
};
</script>

<style scoped="scoped">
.el-table /deep/ .warning-row {
  background: oldlace;
}

.el-table /deep/ .success-row {
  background: #f0f9eb;
}
.yhgl-list /deep/ .el-form-item__content {
  text-align: left;
}
.yhgl-list /deep/ .block .el-input__inner {
  width: 100px;
}
</style>