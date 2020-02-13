<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="addRoleClick">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表 -->
      <el-table :data="rolesList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row class="row1" v-for="item1 in scope.row.children" :key="item1.id">
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row, item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row class="row2" v-for="item2 in item1.children" :key="item2.id">
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row, item2.id)"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="288px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="editRoleClick(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteRoleClick(scope.row)"
            >删除</el-button>
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showRightDialog(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限对话框 -->
    <el-dialog title="提示" :visible.sync="rightDialogVisible" width="50%">
      <el-tree
        :data="rightsList"
        :props="treetProps"
        :default-checked-keys="treeNodeKeys"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="treeRef"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加角色对话框 -->
    <el-dialog
      title="编辑角色信息"
      :visible.sync="addRoledialogVisible"
      width="50%"
      @closed="resetFields"
    >
      <el-form :model="addRoleForm" :rules="addRoleRules" ref="addRoleRuleForm" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoledialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑角色对话框 -->
    <el-dialog
      title="编辑角色信息"
      :visible.sync="editRoledialogVisible"
      width="50%"
      @closed="resetFields"
    >
      <el-form :model="roleForm" :rules="editRoleRules" ref="editRoleRuleForm" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="roleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRoledialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
 
<script>
import { getRolesList, deleteRights, getRightsList, allotRights, editRole, deleteRole, addRole, findRole } from 'network/home'

export default {
  name: "Roles",
  data() {
    let checkRoleName = (rule, value, callback) => {
      const regUsername = /^[\u4e00-\u9fff\w]{1,12}$/
      if (regUsername.test(value)) return callback()
      callback(new Error('请输入合法的角色名'))
    }
    return {
      //角色列表数据
      rolesList: [],
      // 分配权限对话框显示隐藏
      rightDialogVisible: false,
      //所有权限列表
      rightsList: [],
      //tree配置
      treetProps: {
        children: 'children',
        label: 'authName'
      },
      //tree默认展开的节点的key的数组
      treeNodeKeys: [],
      //当前角色id
      roleId: '',
      // 添加角色对话框显示隐藏
      addRoledialogVisible: false,
      //添加角色表单信息
      addRoleForm: {},
      //添加角色的规则
      addRoleRules: {
        roleName: [{
          required: true,
          message: '请输入角色名称',
          trigger: 'blur'
        },
        {
          validator: checkRoleName,
          trigger: 'blur'
        }],
        roleDesc: [{
          max: 15,
          message: '长度不能超过16个字符',
          trigger: 'blur'
        }]
      },
      // 编辑角色对话框显示隐藏
      editRoledialogVisible: false,
      //要修改的角色信息
      roleForm: {},
      //修改角色规则
      editRoleRules: {
        roleName: [{
          required: true,
          message: '请输入角色名称',
          trigger: 'blur'
        },
        {
          validator: checkRoleName,
          trigger: 'blur'
        }],
        roleDesc: [{
          max: 15,
          message: '长度不能超过16个字符',
          trigger: 'blur'
        }]
      },
      role: {}
    }
  },
  methods: {
    // 请求相关
    //请求角色列表数据
    async getRolesList() {
      const res = await getRolesList()
      if (res.meta.status !== 200) return this.$msg.error('获取角色列表失败')
      //保存角色列表数据
      this.rolesList = res.data
      // console.log(this.rolesList);
    },

    //事件相关
    // 删除权限
    async removeRightById(role, rightId) {

      try {

        await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        //点击确定后向服务器请求删除权限
        const res = await deleteRights(role.id, rightId)
        if (res.meta.status !== 200) return this.$msg.error('删除权限失败')
        // console.log(res);

        role.children = res.data

      } catch (err) {
        this.$msg.info('已取消删除权限')
      }
    },
    // 点击分配权限按钮显示对话框
    async showRightDialog(role) {
      //保存当前角色id
      this.roleId = role.id
      //先请求权限树
      const res = await getRightsList('tree')
      if (res.meta.status !== 200) return this.$msg.error('获取权限数据失败')
      this.rightsList = res.data

      //显示已经存在的权限
      this.treeNodeKeys = []
      this.getLeafKeys(role, this.treeNodeKeys)

      //显示对话框
      this.rightDialogVisible = true
    },

    //通过递归获取所有的三级权限id
    getLeafKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getLeafKeys(item, arr)
      })
    },

    // 点击确定按钮分配权限
    async allotRights() {
      const rids = [
        ...this.$refs.treeRef.getHalfCheckedKeys(),
        ...this.$refs.treeRef.getCheckedKeys()
      ].join()
      const res = await allotRights(this.roleId, rids)
      if (res.meta.status !== 200) return this.$msg.error('权限分配失败')
      console.log(res);

      this.$msg.success('权限分配成功')
      this.getRolesList()
      this.rightDialogVisible = false
    },
    // 添加角色-------------------------------------------------------
    async addRoleClick(role) {
      this.roleId = role.id
      const res = await findRole(this.roleId)
      this.addRoledialogVisible = true
    },
    //点击确定，添加角色
    addRole() {
      this.$refs.addRoleRuleForm.validate(async valid => {
        if (!valid) return
        const res = await addRole(this.addRoleForm)
        console.log(res);

        if (res.meta.status !== 201) return this.$msg.error('角色添加失败')
        this.$msg.success('角色添加成功')
        this.getRolesList()
        this.addRoledialogVisible = false
      })
    },
    //编辑角色--------------------------------------------------------
    //点击编辑角色
    async editRoleClick(role) {
      const res = await findRole(role.id)
      if (res.meta.status !== 200) return
      this.roleForm = res.data
      this.editRoledialogVisible = true
    },
    // 关闭编辑角色对话框事件
    resetFields() {
      this.$refs.editRoleRuleForm && this.$refs.editRoleRuleForm.resetFields()
      this.$refs.addRoleRuleForm && this.$refs.addRoleRuleForm.resetFields()
    },
    //点击确定按钮编辑角色
    editRole() {
      this.$refs.editRoleRuleForm.validate(async valid => {
        if (!valid) return
        const res = await editRole(this.roleForm.roleId, this.roleForm.roleName, this.roleForm.roleDesc)

        if (res.meta.status !== 200) return this.$msg.error('角色信息修改失败')
        this.$msg.success('角色信息修改成功')
        this.getRolesList()
        this.editRoledialogVisible = false
      })
    },
    //删除角色--------------------------------------------------------
    //点击删除角色按钮
    async deleteRoleClick(role) {
      //弹出确认对话框
      try {
        await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await deleteRole(role.id)
        if (res.meta.status !== 200) return this.$msg.error('角色删除失败')
        this.$msg.success('角色删除成功')
        this.getRolesList()
      } catch (err) {
        this.$msg.info('已取消修改角色')
      }

    }
  },
  created() {
    //获取角色列表数据
    this.getRolesList()
  },
}
</script>
 
<style lang="less" scoped>
.row1,
.row2 {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  text-align: left;
}
.row1:first-child {
  border-top: 1px solid #eee;
}
.row2:last-child {
  border: 0;
}
</style>