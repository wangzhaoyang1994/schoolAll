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
							<el-submenu index="1">
								<template slot="title"><i class="el-icon-s-tools"></i>权限管理</template>
								<el-menu-item-group>
									<el-menu-item index="1-1">选项1</el-menu-item>
									<el-menu-item index="1-2">选项2</el-menu-item>
									<el-menu-item index="1-3">选项3</el-menu-item>
								</el-menu-item-group>
							</el-submenu>
							<el-submenu index="2">
								<template slot="title"><i class="el-icon-user-solid"></i>用户管理</template><!--template这个标签里面不能写click,可能是跟自带的click事件冲突-->
								<el-menu-item-group>
									<el-menu-item index="2-1"  @click="showStuList()">学生管理</el-menu-item>
									<el-menu-item index="2-2"  @click="showTeaList()">教师管理</el-menu-item>
								</el-menu-item-group>
							</el-submenu>
							<el-submenu index="3">
								<template slot="title"><i class="el-icon-notebook-2"></i>课程管理</template>
								<el-menu-item-group>
									<el-menu-item index="3-1">课程管理</el-menu-item>
								</el-menu-item-group>
							</el-submenu>
							<el-submenu index="4">
								<template slot="title"><i class="el-icon-view"></i>门户管理</template>
								<el-menu-item-group>
									<el-menu-item index="4-1">新闻类管理</el-menu-item>
									<el-menu-item index="4-2">文章管理</el-menu-item>
									<el-menu-item index="4-3">友情链接管理</el-menu-item>
									<el-menu-item index="4-4" @click="showPic()">图片管理</el-menu-item>																		
									<el-menu-item index="4-5">导航栏管理</el-menu-item>																		
									<el-menu-item index="4-6">名师分类管理</el-menu-item>									
									<el-menu-item index="4-7">名师管理</el-menu-item>
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
	export default {
		data() {
			return {
				src: imgUrl
			}
		},
		methods:{
			showStuList(){
				this.$router.push({
					path:'/stuList',
				})
			},
			showTeaList(){
				this.$router.push({
					path:'/teaList',
				})
			},
			showPic(){
				this.$router.push({
					path:'/addPic',
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
</style>