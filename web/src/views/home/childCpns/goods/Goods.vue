<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 顶部搜索 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入搜索内容"
            v-model="goodsListParams.query"
            clearable
            @clear="clearSearch"
          >
            <el-button slot="append" icon="el-icon-search" @click="searchGoods"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addGoods">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 商品列表表格 -->
      <el-table :data="goodsList" stripe border>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格" prop="goods_price" width="100px"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="100px"></el-table-column>
        <el-table-column label="创建时间" width="150px">
          <template slot-scope="scope">
            <span>{{scope.row.add_time | getDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-edit"
              @click="editGoodsClick(scope.row)"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="deleteGoods(scope.row.goods_id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="pagesizeChange"
        @current-change="pagenumChange"
        :current-page="goodsListParams.pagenum"
        :page-sizes="[5,8,10]"
        :page-size="goodsListParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 编辑商品对话框 -->
    <el-dialog
      title="编辑商品信息"
      :visible.sync="editGoodsDialogVisible"
      width="50%"
      @close="editGoodsDialogClose"
    >
      <!-- 编辑商品表单 -->
      <el-form
        :model="editGoodsForm"
        :rules="editGoodsRules"
        ref="editGoodsFormRef"
        label-width="80px"
      >
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model.trim="editGoodsForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input v-model="editGoodsForm.goods_price" type="number"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="goods_number">
          <el-input v-model="editGoodsForm.goods_number" type="number"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="goods_weight">
          <el-input v-model="editGoodsForm.goods_weight" type="number"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="goods_cat">
          <el-cascader
            v-model="editGoodsForm.goods_cat"
            :options="cateList"
            :props="cateProps"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editGoodsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editGoods">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
 
<script>
import { getGoodsList, deleteGoods, findGoods, editGoods, getCategories } from 'network/home'
import { formatDate } from 'common/utils'

export default {
  name: "Goods",
  data() {
    return {
      ///请求商品列表数据的参数
      goodsListParams: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      //总商品条数
      total: 0,
      // 商品列表数据
      goodsList: [],
      //编辑商品对话框显示隐藏
      editGoodsDialogVisible: false,
      //编辑商品表单数据
      editGoodsForm: {},
      //编辑商品表单规则
      editGoodsRules: {
        goods_name: [{
          required: true,
          message: '请输入商品名称',
          trigger: 'blur'
        }],
        goods_price: [{
          required: true,
          message: '请输入商品价格',
          trigger: 'blur'
        }],
        goods_number: [{
          required: true,
          message: '请输入商品数量',
          trigger: 'blur'
        }],
        goods_weight: [{
          required: true,
          message: '请输入商品重量',
          trigger: 'blur'
        }]
      },
      goodsId: '',
      // 编辑商品对话框级联选择器配置
      cateProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      cateList: []
    }
  },
  filters: {
    getDate(value) {
      const date = new Date(value)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  methods: {
    // 获取商品列表数据
    async getCategories() {
      const res = await getCategories()
      if (res.meta.status !== 200) return
      // console.log(res.data);
      this.cateList = res.data
    },
    //获取商品数据列表
    async getGoodsList() {
      const res = await getGoodsList(this.goodsListParams)
      if (res.meta.status !== 200) return

      this.total = res.data.total
      this.goodsList = res.data.goods
    },
    //每页显示数量更改
    pagesizeChange(pagesize) {
      this.goodsListParams.pagesize = pagesize
      this.getGoodsList()
    },
    // 页码更改
    pagenumChange(pagenum) {
      this.goodsListParams.pagenum = pagenum
      this.getGoodsList()
    },
    // 搜索商品
    searchGoods() {
      this.getGoodsList()
    },
    //清空搜索框
    clearSearch() {
      this.getGoodsList()
    },
    //点击删除商品按钮
    async deleteGoods(goodsId) {
      try {
        await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await deleteGoods(goodsId)
        if (res.meta.status !== 200) return this.$msg.error('商品删除失败')
        this.$msg.success('商品删除成功')
        this.getGoodsList()
      } catch (error) {
        this.$msg.info('已取消删除')
      }
    },
    //点击添加商品按钮
    addGoods() {
      this.$router.push('/goods/add')
    },
    //编辑商品
    async editGoodsClick(goods) {
      this.getCategories()
      this.goodsId = goods.goods_id
      const res = await findGoods(this.goodsId)
      if (res.meta.status !== 200) return
      const editGoodsData = {
        goods_name: res.data.goods_name,
        goods_price: res.data.goods_price,
        goods_number: res.data.goods_number,
        goods_weight: res.data.goods_weight,
        cat_id: res.data.cat_id
      }
      this.editGoodsForm = editGoodsData
      this.editGoodsDialogVisible = true
    },
    // 监听编辑商品确定按钮
    editGoods() {
      this.$refs.editGoodsFormRef.validate(async valid => {

        if (!valid) return
        
        if(this.editGoodsForm.goods_cat) this.editGoodsForm.goods_cat = this.editGoodsForm.goods_cat.join(',')
        
        const res = await editGoods(this.goodsId, this.editGoodsForm)

        if (res.meta.status !== 200) return this.$msg.error('商品信息编辑失败')
        this.$msg.success('商品信息编辑成功')
        this.getGoodsList()
        this.editGoodsDialogVisible = false
      })
    },
    //监听对话框关闭
    editGoodsDialogClose() {
      this.$refs.editGoodsFormRef.resetFields()
    }
  },
  created() {
    this.getGoodsList()
  }
}
</script>
 
<style lang="less" scoped>
</style>