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
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-upload class="upload-demo">
            <el-button type="primary"><i class="el-icon-upload el-icon--left"></i>上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findAll } from "../../api/UserLogin";
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
      form: {
        name: "",
        role: ""
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
      this.form.name = val.name;
      this.form.role = val.role;
      this.dialogFormVisible = true;
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
.yhgl-list /deep/ .el-input__inner {
  width: 300px;
}
</style>