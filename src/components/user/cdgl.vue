<template>
  <div class="cdgl-list">
    <div class="addmenu">
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="openMenu(0)">添加菜单</el-button>
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
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="openMenu(scope.row.id)"
          >添加子菜单</el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--对话框-->
    <el-dialog :title="titleDia" :visible.sync="dialogFormVisible" width="25%">
      <el-form :model="addForm">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="addForm.roles" placeholder="请选择角色" multiple>
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="教师" value="teacher"></el-option>
            <el-option label="学生" value="student"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="前端路由" :label-width="formLabelWidth">
          <el-input v-model="addForm.component"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewMenu">确 定</el-button>
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
import { menuList, addMenu,menuListPage } from "../../api/menuList";
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
      titleDia: "",
      pageSizes: [5, 10, 15, 20],
      pageSize: 5,
      total:0,
      currentPage: 1,
      addForm: {
        name: "",
        roles: [],
        component: "",
        parentId: 0
      }
    };
  },
  mounted() {
    this.getMenuList();
  },
  methods: {
    getMenuList() {
      let params = {
        pageNum:this.currentPage,
        pageSize:this.pageSize,
        role: "admin"
      };
      menuListPage(params).then(response => {
        this.menuList = response.data.menuList.list
        this.total=response.data.menuList.total
        this.menuList.forEach(item => {
          if (item.userRole.indexOf(",") == -1) {
            item.userRole = this.roleList.filter(item1 => {
              return item.userRole == item1.value;
            })[0].name;
          } else {
            var roleMul = item.userRole.split(",");
            roleMul.forEach((mul, i) => {
              roleMul[i] = this.roleList.filter(itemMul => {
                return mul == itemMul.value;
              })[0].name;
            });
            item.userRole = roleMul.toString();
          }
          item.children.forEach(item2 => {
            if (item2.userRole.split(",") == -1) {
              item2.userRole = this.roleList.filter(item3 => {
                return item2.userRole == item3.value;
              })[0].name;
            } else {
              var roleChildMul = item2.userRole.split(",");
              roleChildMul.forEach((childMul, i) => {
                roleChildMul[i] = this.roleList.filter(itemChildMul => {
                  return childMul == itemChildMul.value;
                })[0].name;
              });
              item2.userRole = roleChildMul.toString();
            }
          });
        });
      });
    },
    openMenu(val) {
      this.addForm.name = "";
      this.addForm.roles = [];
      this.addForm.component = "";
      this.parqntMenuShow = true;
      this.dialogFormVisible = true;
      this.addForm.parentId = val;
      if (val == 0) {
        this.titleDia = "添加菜单";
      } else {
        this.titleDia = "添加子菜单";
      }
    },
    addNewMenu() {
      this.dialogFormVisible = false;
      var rolesSave = [];
      this.addForm.roles.forEach(item => {
        rolesSave.push(item);
      });
      let params = {
        menuname: this.addForm.name,
        userrole: rolesSave.toString(),
        parentId: this.addForm.parentId,
        component: this.addForm.component
      };
      addMenu(params).then(response => {
        if (response.data == 1) {
          this.$toast("添加成功");
          this.getMenuList(); //控制表格刷新
          this.$parent.$parent.$parent.$parent.getMenuList(); //控制左侧导航栏刷新
        } else {
          this.$toast("添加失败");
        }
      });
    },
    handleSizeChange(val){
      this.pageSize=val
      this.getMenuList()
    },
    handleCurrentChange(val){
      this.currentPage=val
      this.getMenuList()
    }
  }
};
</script>

<style scoped="scoped">
.addmenu {
  margin-left: 0;
  margin-bottom: 10px;
}
.cdgl-list /deep/ .el-form .el-input__inner {
  width: 220px;
}
</style>