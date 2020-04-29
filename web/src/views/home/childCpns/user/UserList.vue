<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 头部搜索区域 -->
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <!-- 搜索框 -->
            <el-input
              v-model="userListReqParams.query"
              placeholder="请输入搜索内容"
              class="input-with-select"
              clearable
              @clear="userListReq"
            >
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <!-- 添加按钮 -->
            <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table :data="userList" stripe border>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="changeState(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="175px">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger "
              size="mini"
              icon="el-icon-delete"
              @click="deleteUserClick(scope.row.id)"
            ></el-button>
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :open-delay="1000"
              :enterable="false"
            >
              <!-- 分配角色按钮 -->
              <el-button
                type="warning "
                size="mini"
                icon="el-icon-setting"
                @click="setRole(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="userListReqParams.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="userListReqParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="resetForm">
      <el-form
        status-icon
        :model="newUser"
        :rules="addUserules"
        ref="addFormRef"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="newUser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="newUser.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="newUser.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="newUser.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserClick">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户对话框 -->
    <el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="50%" @close="resetForm">
      <el-form
        status-icon
        :model="editForm"
        :rules="editUserules"
        ref="editFormRef"
        label-width="80px"
      >
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserClick">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      width="50%"
      @close="setRoleDialogClosed"
    >
      <div class="set-role">
        <p>用户：{{user.username}}</p>
        <p>角色：{{user.role_name}}</p>
        <p>
          选择角色：
          <el-select v-model="setRoleId" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRoleClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userListReq, saveState, addUser, editUser, saveEditUser, deleteUser, getRolesList, setRole } from 'network/home'

export default {
  name: "UserList",
  data() {
    //验证用户名
    let checkUsername = (rule, value, callback) => {
      const regUsername = /^[a-zA-Z][\w]{2,9}$/
      if (regUsername.test(value)) return callback()
      callback(new Error('请输入合法的用户名'))
    }
    //验证密码
    let checkPassword = (rule, value, callback) => {
      const regPsw = /^[\w.]{6,15}$/
      if (regPsw.test(value)) return callback()
      callback(new Error('请输入合法的密码'))
    }
    //验证邮箱
    let checkEmail = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if (regEmail.test(value)) return callback()
      callback(new Error('请输入合法的邮箱'))
    }
    // 验证手机
    let checkMobile = (rule, value, callback) => {
      const regMobile = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (regMobile.test(value)) return callback()
      callback(new Error('请输入合法的手机号码'))
    }

    return {
      //用户列表请求参数
      userListReqParams: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      //用户列表数据
      userList: [],
      //总数据条数
      total: 0,
      //添加用户对话框显示隐藏
      addDialogVisible: false,
      //修改用户对话框显示隐藏
      editDialogVisible: false,
      //分配角色对话框显示隐藏
      setRoleDialogVisible: false,
      //新用户数据
      newUser: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      //新用户添加规则
      addUserules: {
        username: [
          {
            required: true,
            message: '请输入要添加的用户名',
            trigger: 'blur'
          },
          {
            validator: checkUsername,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            validator: checkPassword,
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱'
          },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号码'
          },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ]
      },
      //要修改的用户数据
      editForm: {},
      //修改用户规则
      editUserules: {
        email: [
          {
            required: true,
            message: '请输入邮箱'
          },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号码'
          },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ]
      },
      //当前用户信息
      user: {},
      //角色列表
      roleList: [],
      // 要设置的角色的id
      setRoleId: ''
    }
  },
  methods: {
    //发送用户列表数据请求
    async userListReq() {
      const res = await userListReq(this.userListReqParams)
      if (res.meta.status !== 200) return this.$msg.error(res.meta.msg)
      this.userList = res.data.users
      this.total = res.data.total
    },
    //发送改变用户状态请求
    async changeState(userInfo) {
      const res = await saveState(userInfo.id, userInfo.mg_state)
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$msg.error(res.meta.msg)
      }
      this.$msg.success(res.meta.msg)
    },
    //发送添加用户请求
    async addUserReq() {
      const res = await addUser(this.newUser)
      console.log(res);
      if (res.meta.status !== 201) return this.$msg.error('添加失败')
      this.$msg.success('添加成功')
      //隐藏对话框
      this.addDialogVisible = false
      //重新获取数据
      this.userListReq()
    },
    //发送更新用户信息请求
    async saveEditUser() {
      const res = await saveEditUser(this.editForm.id, this.editForm.email, this.editForm.mobile)
      if (res.meta.status !== 200) return this.$msg.error('编辑失败')
      this.$msg.success('编辑成功')
      this.editDialogVisible = false
      this.userListReq()
    },
    //发送删除用户请求
    async deleteUser(id) {
      const res = await deleteUser(id)
      if (res.meta.status !== 200) return this.$msg.error('删除失败')
      this.$msg.success('删除成功')
      this.userListReq()
    },
    //每页显示几条数据
    handleSizeChange(pageSize) {
      this.userListReqParams.pagesize = pageSize
      this.userListReq()
    },
    //显示第几页
    handleCurrentChange(currentPage) {
      this.userListReqParams.pagenum = currentPage
      this.userListReq()
    },
    //搜索
    search() {
      this.userListReq()
    },
    //重置添加用户对话框
    resetForm() {
      this.$refs.addFormRef && this.$refs.addFormRef.resetFields()
      this.$refs.editFormRef && this.$refs.editFormRef.resetFields()
    },
    //点击确定按钮，如果验证通过则发起网络请求
    addUserClick() {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        this.addUserReq()
      })
    },
    // 点击显示修改用户对话框
    async showEditDialog(id) {
      this.editDialogVisible = true
      const res = await editUser(id)
      if (res.meta.status !== 200) return this.$msg.error('请求数据失败')
      this.editForm = res.data
    },
    //点击确定修改用户按钮
    editUserClick() {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return
        this.saveEditUser()
      })
    },
    //点击删除用户按钮
    async deleteUserClick(id) {
      try {
        await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        //进行数据请求删除该用户
        this.deleteUser(id)
      } catch (err) {
        this.$msg.info('已取消删除')
      }
    },
    // 点击分配角色按钮
    async setRole(user) {
      this.user = user
      const res = await getRolesList()
      this.roleList = res.data
      this.setRoleDialogVisible = true
    },
    // 点击确定分配角色按钮
    async setRoleClick() {
      if (!this.setRoleId) return this.$msg.error('请选择要分配的角色')
      const res = await setRole(this.user.id, this.setRoleId)
      if (res.meta.status !== 200) return this.$msg.error('分配角色失败')
      this.$msg.success('分配角色成功')
      //刷新用户列表
      this.userListReq()
      //关闭对话框
      this.setRoleDialogVisible = false
    },
    //关闭对话框重置分配角色对话框信息
    setRoleDialogClosed() {
      this.setRoleId = ''
      this.user = {}
    }
  },
  created() {
    this.userListReq()
  }
}
</script>
 
<style lang="less" scoped>
.set-role {
  p {
    padding: 8px 0;
  }
}
</style>