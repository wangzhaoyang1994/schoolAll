<template>
  <div class="cdgl-list">
    <div class="addmenu">
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="addParentMenu">添加菜单</el-button>
    </div>
    <el-table :data="menuList" style="width: 100%" border stripe>
      <!--展开列-->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table :data="scope.row.children" :show-header="false" border>
            <el-table-column prop="menuName" label="菜单名称" width="180"></el-table-column>
            <el-table-column prop="userRole" label="角色名称" width="180"></el-table-column>
            <el-table-column label="操作" width="265">
              <template slot-scope="scope">
                <!--作用域插槽-->
                <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <!--索引列
    <el-table-column type="index"></el-table-column>
      -->
      <el-table-column prop="menuName" label="菜单名称" width="180"></el-table-column>
      <el-table-column prop="userRole" label="角色名称" width="180"></el-table-column>
      <el-table-column label="操作" width="320">
        <template slot-scope="scope">
          <!--作用域插槽-->
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="addChildMenu">添加子菜单</el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--对话框-->
    <el-dialog :title="titleDia" :visible.sync="dialogFormVisible" width="25%">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择角色">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="教师" value="teacher"></el-option>
            <el-option label="学生" value="student"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="父菜单" v-if="parqntMenuShow" :label-width="formLabelWidth">
          <el-input v-model="form.parentmenu"></el-input>
        </el-form-item>
        <el-form-item label="前端路由" :label-width="formLabelWidth">
          <el-input v-model="form.component"></el-input>
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
import { menuList } from "../../api/menuList";
export default {
  data() {
    return {
      menuList: [],
      dialogFormVisible: false,
      roleList: [
        { name: "管理员", value: "admin" },
        { name: "教师", value: "teacher" },
        { name: "学生", value: "student" }
      ],
      parqntMenuShow: false,
      formLabelWidth: "80px",
      form: {
        name: "",
        role: "",
        parentmenu: "",
        component: "",
        titleDia: ""
      }
    };
  },
  mounted() {
    this.getMenuList();
  },
  methods: {
    getMenuList() {
      let params = {
        role: "admin"
      };
      menuList(params).then(response => {
        this.menuList = response.data.menuList;
        this.menuList.forEach(item => {
          item.userRole = this.roleList.filter(item1 => {
            return item.userRole == item1.value;
          })[0].name;
          item.children.forEach(item2 => {
            item2.userRole = this.roleList.filter(item3 => {
              return item2.userRole == item3.value;
            })[0].name;
          });
        });
      });
    },
    addParentMenu() {
      this.parqntMenuShow = false;
      this.dialogFormVisible = true;
      this.titleDia = "添加菜单";
    },
    addChildMenu() {
      this.parqntMenuShow = true;
      this.dialogFormVisible = true;
      this.titleDia = "添加子菜单";
    }
  }
};
</script>

<style scoped="scoped">
.addmenu {
  margin-left: 0;
  margin-bottom: 10px;
}
.cdgl-list /deep/ .el-input__inner {
  width: 220px;
}
</style>