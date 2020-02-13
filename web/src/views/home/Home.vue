<template>
  <el-container class="home_container">
    <!-- 头部区域 -->
    <el-header>
      <h2>
        <img src="~assets/img/logo.png" alt />
        <span>电商后台管理系统</span>
      </h2>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>

    <el-container>
      <!-- 左侧边栏 -->
      <el-aside :width="asideWidth">
        <div class="toggle-btn" @click="toggleBtnClick">
          <i class="el-icon-arrow-right" v-if="isCollapse"></i>
          <i class="el-icon-arrow-left" v-else></i>
        </div>
        <!-- 侧边栏菜单 -->
        <el-menu
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="true"
          background-color="#282c34"
          text-color="#fff"
          active-text-color="#409eff"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="subItem.id+''" v-for="(subItem,index) in menuList" :key="subItem.id">
            <!-- 一级菜单模板 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="menuIcon[index]"></i>
              <!-- 文本 -->
              <span>{{subItem.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/'+menuItem.path"
              v-for="menuItem in subItem.children"
              :key="menuItem.id"
            >
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span slot="title">{{menuItem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容 -->
      <el-main>
        <keep-alive exclude="Goods">
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>
 
<script>
import { homeReq } from 'network/home'

export default {
  name: 'Home',
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      //一级菜单图标
      menuIcon: [
        'el-icon-s-custom',
        'el-icon-key',
        'el-icon-s-goods',
        'el-icon-s-order',
        'el-icon-s-marketing'
      ],
      isCollapse: false
    }
  },
  computed: {
    asideWidth() {
      return this.isCollapse ? '64px' : '200px'
    },
    activePath() {
      return this.$route.path
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      const res = await homeReq()
      if (res.meta.status !== 200) return this.$msg.error(res.meta.msg)
      this.menuList = res.data
    },
    toggleBtnClick() {
      this.isCollapse = !this.isCollapse
    }
  },
  created() {
    this.getMenuList()
  }
}
</script>
 
<style lang="less" scoped>
.home_container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #21252b;
  color: #eee;
  h2 {
    span {
      margin-left: 5px;
      line-height: 50px;
    }
    img {
      width: 50px;
      height: 50px;
      vertical-align: middle;
    }
  }
}
.el-aside {
  background-color: #282c34;
  transition: all 0.2s;
}
.toggle-btn {
  background-color: #2c313c;
  text-align: center;
  color: #eee;
  cursor: pointer;
}
.el-main {
  background-color: #e9eef3;
}
.el-menu {
  border-right: 0;
}
[class^="el-icon"] {
  margin-right: 10px;
}
</style>