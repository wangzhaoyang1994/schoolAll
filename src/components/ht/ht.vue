<template>
  <div class="ht">
    <el-container>
      <el-header>
        <img :src="src" style="width: 50px; height: 50px"/>
        <el-dropdown @command="callBack">
          <span class="el-dropdown-link">
            超级管理员
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">学习空间</el-dropdown-item>
            <el-dropdown-item command="b">个人空间</el-dropdown-item>
            <el-dropdown-item command="c">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside style="background-color: rgb(238, 241, 246);width: 18%;">
          <el-scrollbar style="width: 100%;">
            <el-menu>
              <el-submenu :index="item.menuName" v-for="(item,index) in menuList" :key="index">
                <template slot="title">
                  <i class="el-icon-s-tools"></i>
                  {{ item.menuName }}
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    :index="item1.menuName"
                    v-for="(item1,index) in item.children"
                    :key="index"
                  >
                    <router-link :to="item1.component">{{ item1.menuName }}</router-link>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { menuList } from "../../api/menuList";
export default {
  data() {
    return {
      src: "",
      menuList: {}
    };
  },
  mounted: function() {
    this.getMenuList();
    this.src=window.localStorage.getItem("userimg")
  },
  watch: {},
  methods: {
    getMenuList() {
      let param = {
        role: window.localStorage.getItem("role")
      };
      menuList(param).then(re => {
        this.menuList = re.data.menuList;
      });
    },
    callBack(val) {
      if (val == "c") {
        this.$router.push({
          path: "/",
          name: "login"
        });
      }
    }
  }
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #fff;
  color: #333;
}

img {
  position: absolute;
  right: 128px;
  top:5px;
}

.el-image__inner {
  margin-top: 5px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #000;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.el-dropdown {
  position: absolute;
  right: 30px;
}

.el-popper {
  top: 40px !important;
}

.el-aside {
  height: 100%;
}

.el-container {
  height: 877px;
}
.el-menu-item a {
  text-decoration: none;
}
</style>
