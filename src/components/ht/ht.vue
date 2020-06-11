<template>
	<div class="ht">
		<el-container>
			<el-header>
				<el-image :src="src" style="width: 50px; height: 50px">
					<div slot="placeholder" class="image-slot">
						加载中<span class="dot">...</span>
					</div>
				</el-image>
				<el-dropdown>
					<span class="el-dropdown-link">超级管理员<i class="el-icon-arrow-down el-icon--right"></i></span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>学习空间</el-dropdown-item>
						<el-dropdown-item>个人空间</el-dropdown-item>
						<el-dropdown-item>退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-header>
			<el-container>
				<el-aside style="background-color: rgb(238, 241, 246);width: 18%;">
					<el-scrollbar style="width: 100%;">
						<el-menu>
							<el-submenu :index="item.menuName" v-for="(item,index) in menuList" :key="index">
								<template slot="title"><i class="el-icon-s-tools"></i>{{ item.menuName }}</template>
								<el-menu-item-group>
									<el-menu-item :index="item1.menuName" v-for="(item1,index) in item.children" :key="index"><router-link :to="item1.component">{{ item1.menuName }}</router-link></el-menu-item>
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
	import imgUrl from '../../assets/images/userPic.png'
	import { menuList } from '../../api/menuList'
	export default {
		data() {
			return {
				src: imgUrl,
				menuList:{}
			}
		},
		mounted:function(){
			this.getMenuList()
		},
		watch:{

		},
		methods:{
			getMenuList(){
				let param={
					role:window.localStorage.getItem("role")
				}
				menuList(param).then(re => {
					this.menuList=re.data.menuList
					console.log(this.menuList);
				})
			}
		}
	}
</script>

<style>
	.el-header,
	.el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}
	
	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
		line-height: 200px;
	}
	
	.el-main {
		background-color: #fff;
		color: #333;
		text-align: center;

	}
	
	.el-image {
		position: absolute;
		right: 128px;
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
		top: 40px!important
	}
	
	.el-aside {
		height: 100%;
	}
	
	.el-container {
		height: 877px;
	}
	.el-menu-item a{
		text-decoration:none
	}
</style>