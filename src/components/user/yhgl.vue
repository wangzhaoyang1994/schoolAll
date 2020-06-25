<template>
  <div class="yhgl-list">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="(item,index) in headData"
        :key="index"
        :prop="item.prop"
        :label="item.label"
      >
        <template slot-scope="scope">
          <div v-if="scope.column.property == 'caozuo'">
            <el-button type="success" size="small">查看</el-button>
            <el-button type="warning" size="small" @click="edit(scope.row)">编辑</el-button>
          </div>
          <img :src="scope.row[scope.column.property]" v-else-if="scope.column.property == 'userimg'" width="30px" height="30px"/>
          <span v-else>{{scope.row[scope.column.property]}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="用户编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="form.role" placeholder="请选择角色">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="教师" value="teacher"></el-option>
            <el-option label="学生" value="student"></el-option>
          </el-select>
        </el-form-item>
        <el-input v-model="userimgV" type="hidden"></el-input>
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
            <img :src="form.pictureAddress" width="25px" />
            <el-button type="primary">
              <i class="el-icon-upload el-icon--left"></i>上传
            </el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findAll,updateUser } from "../../api/UserLogin";
export default {
  data() {
    return {
      tableData: [],
      itemCompare: [
        { name: "管理员", value: "admin" },
        { name: "教师", value: "teacher" },
        { name: "学生", value: "student" }
      ],
      dialogFormVisible: false,
      userimgV:'',
      form: {
        id:"",
        name: "",
        role: "",
        pictureAddress: ""
      },
      formLabelWidth: "120px",
      headData: [
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "role",
          label: "角色"
        },
        {
          prop: "userimg",
          label: "头像"
        },
        {
          prop: "caozuo",
          label: "操作"
        }
      ]
    };
  },
  mounted: function() {
    this.findAllUser();
  },
  methods: {
    findAllUser() {
      findAll().then(re => {
        this.tableData = re.data;
        this.tableData.forEach(item => {
          item.role = this.itemCompare.filter(item1 => {
            return item.role == item1.value;
          })[0].name;
        });
      });
    },
    edit(val) {
      console.log(val)
      this.form.name = val.name;
      this.form.role = val.role;
      this.form.id = val.id;
      this.form.pictureAddress = val.userimg;
      this.userimgV = val.userimg;
      this.dialogFormVisible = true;
    },
    uploadUrl() {
      var uUrl = process.env.BASE_API + "/file/upload";
      return uUrl;
    },
    successHandle(res, file) {
      if (file.response.code == 200) {
        this.$toast(file.response.msg);
        this.form.pictureAddress = file.response.path;
        this.userimgV = file.response.path
      }
    },
    beforeUpload2(file) {
      const isLt2M = file.size < 1024 * 1024 * 50;
      if (!isLt2M) {
        this.$toast("上传文件大小不能超过 50MB!");
      }
    },
    updateUser(){
      this.dialogFormVisible=false
      let params={
        id:this.form.id,
        name:this.form.name,
        role:this.form.role,
        userimg:this.userimgV
      }
      updateUser(params).then(res => {
        if(res.data == 1){
          this.$toast('修改成功')
          this.findAllUser()
          this.$refs.uploadpic.clearFiles() //上传完成之后，清空之前的图片列表
        }
      })
    },
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
.yhgl-list /deep/ .el-input__inner {
  width: 300px;
}
</style>