<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加分类按钮 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addCate">添加分类</el-button>
        </el-col>
      </el-row>

      <!-- 商品分类表格 -->
      <tree-table
        class="tree-table"
        :data="cateList"
        :columns="columns"
        show-index
        :selection-type="false"
        :expand-type="false"
        border
        :show-row-hover="false"
      >
        <template slot="isDeleted" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted" style="color: lightgreen"></i>
          <i class="el-icon-error" v-else style="color: orangered"></i>
        </template>

        <template slot="cat_level" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cte_level == 0">一级</el-tag>
          <el-tag size="mini" type="sucess" v-else-if="scope.row.cte_level == 1">二级</el-tag>
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>

        <template slot="opt" slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="editCate(scope.row.cat_id)"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteCateClick(scope.row.cat_id)"
          ></el-button>
        </template>
      </tree-table>

      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="cateParams.pagenum"
        :page-sizes="[ 5, 10]"
        :page-size="cateParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>
    <!-- 添加商品分类对话框 -->
    <el-dialog title="添加商品分类" :visible.sync="addDialogVisible" width="50%" @close="addCateClose">
      <!-- 添加分类表单 -->
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="80px"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model.trim="addCateForm.cat_name"></el-input>
        </el-form-item>
        <!-- 级联选择器 -->
        <el-form-item label="分类选择">
          <el-cascader
            v-model="addSlectedValue"
            :options="addAllCateList"
            :props="addSetCascader"
            @change="addCascaderChange"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCateClick">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑分类对话框 -->
    <el-dialog title="修改商品分类" :visible.sync="editDialogVisible" width="50%" @close="editCateClose">
      <!-- 添加分类表单 -->
      <el-form
        :model="editCateForm"
        :rules="editCateFormRules"
        ref="editCateFormRef"
        label-width="80px"
      >
        <el-form-item label="编辑分类" prop="cat_name">
          <el-input v-model="editCateForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCateClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
 
<script>
import { getCategories, addCate, getCateById, editCate, deleteCate } from 'network/home'

export default {
  name: "Categories",
  data() {
    return {
      //请求商品分类数据的参数
      cateParams: {
        pagenum: 1,
        pagesize: 5
      },
      //总数据条数
      total: 0,
      //商品分类数据
      cateList: [],
      //表格列配置
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'isDeleted'
        },
        {
          label: '排序',
          type: 'template',
          template: 'cat_level'
        },
        {
          label: '操作',
          type: 'template',
          template: 'opt'
        }
      ],
      // 添加分类---------------------------------------------------------------------
      //添加分类对话框显示隐藏 
      addDialogVisible: false,
      //添加分类表单数据
      addCateForm: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      //添加分类规则
      addCateFormRules: {
        cat_name: [
          {
            required: true,
            message: '请输入分类名称',
            trigger: 'blur'
          },
          {
            max: 20,
            message: '分类名称不能超多20个字符',
            trigger: 'blur'
          }
        ]
      },
      //添加分类级联选择器数据
      addAllCateList: [],
      //添加分类级联选择器配置
      addSetCascader: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        checkStrictly: true
      },
      //选中项的值
      addSlectedValue: [],
      //编辑分类------------------------------------------------------------------
      //编辑分类对话框显示隐藏
      editDialogVisible: false,
      // 编辑分类表单数据
      editCateForm: {},
      //编辑分类规则
      editCateFormRules: {
        cat_name: [
          {
            required: true,
            message: '请输入分类名称',
            trigger: 'blur'
          },
          {
            max: 20,
            message: '分类名称不能超多20个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    //请求相关>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //商品分类
    async getCategories() {
      const res = await getCategories(this.cateParams)
      if (res.meta.status !== 200) return this.$msg.error('商品分类获取失败')
      this.cateList = res.data.result
      console.log(this.cateList);

      this.total = res.data.total
      // console.log(res);
    },
    // 事件相关>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //分页功能
    handleSizeChange(pagesize) {
      this.cateParams.pagesize = pagesize
      this.getCategories()
    },
    handleCurrentChange(pagenum) {
      this.cateParams.pagenum = pagenum
      this.getCategories()
    },
    // 添加分类---------------------------------------------------------
    async addCate() {
      const res = await getCategories({ type: 2 })
      if (res.meta.status !== 200) return
      this.addAllCateList = res.data
      this.addDialogVisible = true
    },
    //当级联选择器选择节点改变触发
    addCascaderChange() {
      if (this.addSlectedValue.length > 0) {
        this.addCateForm.cat_pid = this.addSlectedValue[this.addSlectedValue.length - 1]
        this.addCateForm.cat_level = this.addSlectedValue.length
      } else {
        this.addCateForm.cat_pid = 0
        this.addCateForm.cat_level = 0
      }
      // console.log(this.addSlectedValue);
    },
    // 点击确定按钮
    addCateClick() {
      this.$refs.addCateFormRef.validate(async valid => {
        if (!valid) return
        const res = await addCate(this.addCateForm)
        if (res.meta.status !== 201) return this.$msg.error('分类添加失败')
        this.$msg.success('分类添加成功')
        this.getCategories()
        this.addDialogVisible = false
      })
    },
    //关闭对话框
    addCateClose() {
      this.$refs.addCateFormRef.resetFields()
      this.addSlectedValue = []
    },
    //编辑分类-----------------------------------------------------------
    async editCate(cateId) {
      const res = await getCateById(cateId)
      if (res.meta.status !== 200) return
      this.editCateForm = res.data
      this.editDialogVisible = true
    },
    //编辑分类对话框关闭
    editCateClose() {
      this.$refs.editCateFormRef.resetFields()
    },
    //确定提交编辑
    editCateClick() {
      this.$refs.editCateFormRef.validate(async valid => {
        if (!valid) return
        const res = await editCate(this.editCateForm.cat_id, this.editCateForm.cat_name)
        if (res.meta.status !== 200) return this.$msg.error('分类修改失败')
        this.$msg.success('分类修改成功')
        this.getCategories()
        this.editDialogVisible = false
      })
    },
    // 删除分类-----------------------------------------------------------
    async deleteCateClick(cateId) {

      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });

        // 删除分类请求
        const res = await deleteCate(cateId)
        if (res.meta.status !== 200) return this.$msg.error('分类删除失败')
        this.$msg.success('分类删除成功')
        this.getCategories()

      } catch (err) {

        this.$msg.info('已取消删除')

      }
    }
  },
  created() {
    this.getCategories()
  }
}
</script>
 
<style lang="less" scoped>
.el-icon-success,
.el-icon-error {
  font-size: 14px;
}
.tree-table {
  margin-top: 15px;
}
.choose-cate {
  margin-bottom: 10px;
}
</style>