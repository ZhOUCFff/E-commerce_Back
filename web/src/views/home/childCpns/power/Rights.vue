<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
 
<script>
import { getRightsList } from 'network/home'

export default {
  name: "Rights",
  data() {
    return {
      //权限列表数据
      rightsList: []
    }
  },
  methods: {
    //请求用户列表数据
    async getRightsList() {
      const res = await getRightsList('list')
      if (res.meta.status !== 200) return this.$msg.error('权限列表获取失败')
      //保存权限列表数据
      this.rightsList = res.data
    }
  },
  created() {
    // 获取用户列表数据
    this.getRightsList()
  }
}
</script>
 
<style lang="less" scoped>
.el-table {
  margin: 0;
}
</style>