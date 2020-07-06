<template>
  <div>
    <el-table :data="dataTable">
      <el-table-column
        v-for="(item,index) in tableHeadeDta"
        :key="index"
        :prop="item.prop"
        :label="item.label"
      >
        <template slot-scope="scope">
          <div v-if="scope.column.property == 'caozuo'">
            <el-button type="warning" size="small" @click="treeListShow(scope.row.role)">
              <i class="el-icon-setting el-icon--left"></i>分配角色
            </el-button>
          </div>
          <span v-else>{{scope.row[scope.column.property]}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <span slot="footer" class="dialog-footer">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          default-expand-all
          :props="defaultProps"
          ref="rightsTree"
          :check-strictly="true"
        ></el-tree>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="fpqxSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { selectRole } from "../../api/UserLogin";
import { menuList, findAllMenu,menuSure } from "../../api/menuList";
export default {
  data() {
    return {
      tableHeadeDta: [
        {
          prop: "role",
          label: "角色"
        },
        {
          prop: "caozuo",
          label: "操作"
        }
      ],
      dataTable: [],
      roles: [
        { name: "管理员", value: "admin" },
        { name: "教师", value: "teacher" },
        { name: "学生", value: "student" }
      ],
      dialogVisible: false,
      defaultProps: {
        children: "children",
        label: "menuName"
      },
      data: [],
      idsSelected: [],
      roleSure:''
    };
  },
  mounted() {
    this.getRole();
  },
  methods: {
    getRole() {
      selectRole().then(res => {
        this.dataTable = res.data;
        this.dataTable.forEach(item => {
          item.role = this.roles.filter(item1 => {
            return item.role == item1.value;
          })[0].name;
        });
      });
    },
    treeListShow(val) {
      var parentId = [];
      var childrenId = [];
      val = this.roles.filter(item => {
        return val == item.name;
      })[0].value;
      this.roleSure=val
      findAllMenu().then(re => {
        this.data = re.data;
        let param = {
          role: val
        };

        menuList(param).then(res => {
          res.data.menuList.forEach(item1 => {
            parentId.push(item1.id);
            item1.children.forEach(item2 => {
              childrenId.push(item2.id);
            });
          });
          this.idsSelected=parentId.concat(childrenId)
          //console.log('parentId',parentId);
          //console.log('childrenId',childrenId);
          //console.log('idsSelected',this.idsSelected)
          this.$nextTick(() => {
            this.$refs.rightsTree.setCheckedKeys(this.idsSelected);//默认选中的菜单  需要在el-tree设置  :check-strictly="true"
          });
        });
      });

      this.dialogVisible = true;
    },
    fpqxSure(){
      var ids=[]
      this.dialogVisible=false
      ids=this.$refs.rightsTree.getCheckedKeys() // 获取选中菜单的id
      if(ids.length == 0){
        ids.push(0)
      }
      console.log('ids',this.$refs.rightsTree.getCheckedKeys())
      menuSure(ids,this.roleSure).then(res => {
        if(res.status == 200 && res.data.result ==1){
          this.$toast(res.data.msg)
          this.$parent.$parent.$parent.$parent.getMenuList(); //控制左侧导航栏刷新
        }else{
          this.$toast("权限分配失败")
        }
      })
    }
  }
};
</script>
<style scoped>
</style>