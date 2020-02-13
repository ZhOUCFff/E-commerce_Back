<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 头部警告 -->
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon></el-alert>
      <!-- 选择商品分类 -->
      <el-row>
        <el-col>
          <div class="choose-cate">选择商品分类</div>
          <el-cascader
            v-model="selectedCateKey"
            :options="cateList"
            :props="cateProps"
            @change="cascaderChange"
            clearable
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- tab标签 -->
      <el-tabs v-model="activeTab" @tab-click="tabClick">
        <!-- 动态参数面板 -->
        <el-tab-pane label="动态参数" name="many">
          <el-button size="mini" type="primary" :disabled="!selectedCateKey" @click="addMany">添加动态参数</el-button>
          <!-- 动态参数表格 -->
          <el-table :data="paramsData" border stripe>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  v-for="(item,index) in scope.row.attr_vals"
                  :key="index"
                  closable
                  @close="tagClose(index,scope.row)"
                >{{item}}</el-tag>
                <el-input
                  class="tag-input"
                  v-if="scope.row.tagInputVisible"
                  v-model="scope.row.tagInputValue"
                  ref="tagInputRef"
                  size="small"
                  @keyup.enter.native="$event.target.blur"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <el-button v-else size="small" @click="showTagInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  circle
                  @click="editMany(scope.row.attr_id)"
                ></el-button>
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  circle
                  @click="deleteMany(scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 静态参数面板 -->
        <el-tab-pane label="静态属性" name="only">
          <el-button size="mini" type="primary" :disabled="!selectedCateKey" @click="addOnly">添加静态属性</el-button>
          <!-- 静态属性表格 -->
          <el-table :data="paramsData" border stripe>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  v-for="(item,index) in scope.row.attr_vals"
                  :key="index"
                  closable
                  @close="tagClose(index,scope.row)"
                >{{item}}</el-tag>
                <el-input
                  class="tag-input"
                  v-if="scope.row.tagInputVisible"
                  v-model="scope.row.tagInputValue"
                  ref="tagInputRef"
                  size="small"
                  @keyup.enter.native="$event.target.blur"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <el-button v-else size="small" @click="showTagInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  circle
                  @click="editOnly(scope.row.attr_id)"
                ></el-button>
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  circle
                  @click="deleteOnly(scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

      <!-- 添加对话框 -->
      <el-dialog
        :title="'添加'+paramDialogTitle"
        :visible.sync="adddialogVisible"
        width="50%"
        @close="addDialogClose"
      >
        <!-- 添加表单 -->
        <el-form :model="addForm" :rules="addRules" ref="addFormRef" label-width="80px">
          <el-form-item :label="paramDialogTitle" prop="attr_name">
            <el-input v-model.trim="addForm.attr_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="adddialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addParamClick">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑对话框 -->
      <el-dialog
        :title="'编辑'+paramDialogTitle"
        :visible.sync="editdialogVisible"
        width="50%"
        @close="editDialogClose"
      >
        <!-- 编辑表单 -->
        <el-form :model="editForm" :rules="editRules" ref="editFormRef" label-width="80px">
          <el-form-item :label="paramDialogTitle" prop="attr_name">
            <el-input v-model.trim="editForm.attr_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editdialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editParamClick">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 删除对话框 -->
    </el-card>
  </div>
</template>
 
<script>
import { getCategories, getCateParams, addParams, getCateParamById, editParam, deleteParam } from 'network/home'

export default {
  name: "Params",
  data() {
    return {
      //所有分类数据
      cateList: [],
      //级联选择器配置
      cateProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        emitPath: false
      },
      //级联选择器选中项
      selectedCateKey: null,
      //tab标签活跃项
      activeTab: 'many',
      //参数数据
      paramsData: [],
      // 添加对话框显示隐藏
      adddialogVisible: false,
      //添加表单数据
      addForm: {},
      //添加表单的规则
      addRules: {
        attr_name: [
          { required: true, message: '请输入参数或属性名称', trigger: 'blur' },
          { max: 20, message: '参数或属性名长度不能超过20个字符', trigger: 'blur' }
        ],
      },
      //编辑对话框显示隐藏
      editdialogVisible: false,
      //编辑表单数据
      editForm: {},
      //编辑表单规则
      editRules: {
        attr_name: [
          { required: true, message: '请输入参数或属性名称', trigger: 'blur' },
          { max: 20, message: '参数或属性名长度不能超过20个字符', trigger: 'blur' }
        ]
      },
      attrId: null
    }
  },
  computed: {
    paramDialogTitle() {
      return this.activeTab === 'many' ? '动态参数' : '静态属性'
    }
  },
  methods: {
    //获取所有分类
    async getCategories() {
      const res = await getCategories()
      if (res.meta.status !== 200) return
      this.cateList = res.data
    },
    // 请求分类参数
    async getCateParams() {
      const res = await getCateParams(this.selectedCateKey, this.activeTab)
      if (res.meta.status !== 200) return
      this.attrId = res.data.attr_id
      //赋值之前将attr_vals转换成数组
      res.data.forEach(item => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
        item.tagInputVisible = false
        item.tagInputValue = ''
      })
      this.paramsData = res.data

      // console.log(res.data);
    },
    //级联选择器changge事件
    async cascaderChange() {
      if (this.selectedCateKey) {
        this.getCateParams()
      } else {
        this.paramsData = []
      }
    },
    // tab标签点击事件
    async tabClick() {
      if (!this.selectedCateKey) return
      this.getCateParams()
    },
    //动态参数操作---------------------------------------
    //添加动态参数
    addMany() {
      this.adddialogVisible = true
    },
    //确认添加
    addParamClick() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const res = await addParams(this.selectedCateKey, this.addForm.attr_name, this.activeTab)
        if (res.meta.status !== 201) return this.$msg.error(this.paramDialogTitle + '添加失败')
        this.$msg.success(this.paramDialogTitle + '添加成功')
        this.getCateParams()
        this.adddialogVisible = false
      })
    },
    //编辑动态参数
    async editMany(attrId) {
      //根据id查询参数
      const res = await getCateParamById(this.selectedCateKey, attrId, this.activeTab)
      if (res.meta.status !== 200) return
      this.editForm = res.data
      this.attrId = attrId
      this.editdialogVisible = true
    },
    //编辑对话框关闭
    editDialogClose() {
      this.$refs.editFormRef.resetFields()
    },
    //确认编辑动态参数
    editParamClick() {

      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const res = await editParam(this.selectedCateKey, this.attrId, this.editForm.attr_name, this.activeTab)
        if (res.meta.status !== 200) return this.$msg.error(this.paramDialogTitle + '修改失败')
        this.$msg.success(this.paramDialogTitle + '修改成功')
        this.getCateParams()
        this.editdialogVisible = false

      })
    },
    //删除动态参数
    async deleteMany(cate) {
      try {

        await this.$confirm('此操作将永久删除该动态参数, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        const res = await deleteParam(cate.cat_id, cate.attr_id)
        if (res.meta.status !== 200) return this.$msg.error('动态参数删除失败')
        this.$msg.success('动态参数删除成功')
        this.getCateParams()

      } catch (error) {

        this.$msg.info('已取消删除')

      }
    },
    // 对话框关闭
    addDialogClose() {
      this.$refs.addFormRef.resetFields()
    },
    //静态属性操作---------------------------------------
    //添加静态属性
    addOnly() {
      this.adddialogVisible = true
    },
    //编辑静态属性
    async editOnly(attrId) {
      //根据id查询参数
      const res = await getCateParamById(this.selectedCateKey, attrId, this.activeTab)
      if (res.meta.status !== 200) return
      this.editForm = res.data
      this.attrId = attrId
      this.editdialogVisible = true
    },
    //删除静态属性
    async deleteOnly(cate) {
      try {

        await this.$confirm('此操作将永久删除该静态属性, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        const res = await deleteParam(cate.cat_id, cate.attr_id)
        if (res.meta.status !== 200) return this.$msg.error('静态属性删除失败')
        this.$msg.success('静态属性删除成功')
        this.getCateParams()

      } catch (error) {

        this.$msg.info('已取消删除')

      }
    },
    //显示隐藏input
    showTagInput(cate) {
      cate.tagInputVisible = true
      this.$nextTick(_ => {
        this.$refs.tagInputRef.$refs.input.focus();
      })
    },
    //失去焦点或者回车
    async handleInputConfirm(cate) {
      const reg = /^[^\s]*$/
      if (!reg.test(cate.tagInputValue)) {
        this.$msg.error('录入信息不能包含空格')
        cate.tagInputValue = ''
        cate.tagInputVisible = false
        return
      }

      // 如果input中的内容合法则进行请求

      //处理数据
      cate.attr_vals.push(cate.tagInputValue)
      //将input隐藏清空
      cate.tagInputVisible = false
      cate.tagInputValue = ''
      this.saveAttrVals(cate)
    },
    // 关闭标签
    async tagClose(index, cate) {
      cate.attr_vals.splice(index, 1)
      this.saveAttrVals(cate)
    },
    //保存标签数据
    async saveAttrVals(cate) {
      const res = await editParam(
        this.selectedCateKey,
        cate.attr_id,
        cate.attr_name,
        this.activeTab,
        cate.attr_vals.join(' ')
      )
      if (res.meta.status !== 200) return
    }
  },
  created() {
    this.getCategories()
  }
}
</script>
 
<style lang="less" scoped>
.choose-cate {
  margin: 15px 0;
}
.tag-input {
  width: 8rem;
}
</style>