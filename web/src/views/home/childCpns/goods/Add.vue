<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 提示 -->
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>
      <!-- 步骤条 -->
      <el-steps :space="200" :active="activeStep-0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- 左侧tab标签页 -->
      <el-form
        :model="addGoodsForm"
        :rules="addGoodsRules"
        ref="addGoodsFormRef"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          v-model="activeStep"
          tab-position="left"
          :before-leave="beforeTabLeave"
          @tab-click="tabClick"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addGoodsForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addGoodsForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight" type="number">
              <el-input v-model="addGoodsForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number" type="number">
              <el-input v-model="addGoodsForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addGoodsForm.goods_cat"
                :options="cateList"
                :props="cateProps"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item :label="item.attr_name" v-for="item in manyData" :key="item.attr_id">
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="item"
                  v-for="(item,index) in item.attr_vals"
                  :key="index"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item v-for="item in onlyData" :key="item.attr_id" :label="item.attr_name">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!-- 上传图片组件 -->
            <el-upload
              action="http://127.0.0.1:8888/api/private/v1/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :headers="headers"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <!-- 富文本编辑器 -->
            <quill-editor v-model="addGoodsForm.goods_introduce" ref="myQuillEditor"></quill-editor>
            <!-- 添加商品按钮 -->
            <el-button type="primary" class="add-btn" @click="add">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!-- 图片预览对话框 -->
    <el-dialog title="图片预览" :visible.sync="previewDialogVisible" width="45%">
      <img class="preview-img" :src="previewURL" />
    </el-dialog>
  </div>
</template>
 
<script>
import { getCategories, getCateParams, addGoods } from 'network/home'

export default {
  name: "Add",
  data() {
    return {
      activeStep: '0',
      //表单数据
      addGoodsForm: {
        goods_name: '',
        goods_cat: [],
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      //表单验证规则
      addGoodsRules: {
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
        goods_weight: [{
          required: true,
          message: '请输入商品重量',
          trigger: 'blur'
        }],
        goods_number: [{
          required: true,
          message: '请输入商品数量',
          trigger: 'blur'
        }]
      },
      //所有分类数据
      cateList: [],
      //级联选择器配置
      cateProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      manyData: [],
      onlyData: [],
      //图片预览地址
      previewURL: '',
      // 图片上传请求头
      headers: {
        Authorization: window.sessionStorage.getItem('token')
      },
      previewDialogVisible: false
    }
  },
  computed: {
    cateId() {
      if (this.addGoodsForm.goods_cat) return this.addGoodsForm.goods_cat[2]
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
    // tab标签离开之前
    beforeTabLeave(activeName, oldActiveName) {
      if (this.addGoodsForm.goods_cat.length === 0) {
        this.$msg.error('请先选择商品分类')
        return false
      }
    },
    async tabClick() {
      // 点击第二个tab，获取商品动态参数
      if (this.activeStep === '1') {
        const res = await getCateParams(this.cateId, 'many')
        if (res.meta.status !== 200) return
        res.data.forEach(item => {
          item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
        })
        this.manyData = res.data
      } else if (this.activeStep === '2') {
        const res = await getCateParams(this.cateId, 'only')
        if (res.meta.status !== 200) return
        this.onlyData = res.data
      }
    },
    //预览图片
    handlePreview(file) {
      this.previewURL = file.response.data.url
      this.previewDialogVisible = true
    },
    //移除图片
    handleRemove(file) {
      const index = this.addGoodsForm.pics.findIndex(item => item.pic == file.response.data.tmp_path)
      this.addGoodsForm.pics.splice(index, 1)
    },
    // 监听图片上传成功
    handleSuccess(response) {
      const tmp_path = {
        pic: response.data.tmp_path
      }
      this.addGoodsForm.pics.push(tmp_path)
    },
    //监听添加按钮
    add() {
      this.$refs.addGoodsFormRef.validate(async valid => {
        if (!valid) return this.$msg.error('请填写必填项')
        //深拷贝
        const form = JSON.parse(JSON.stringify(this.addGoodsForm))
        //处理深拷贝后的数据
        form.goods_cat = form.goods_cat.join(',')
        // 添加attr属性
        this.manyData.forEach(item => {
          let obj = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          }
          form.attrs.push(obj)
        })

        this.onlyData.forEach(item => {
          let obj = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          }
          form.attrs.push(obj)
        })
        const res = await addGoods(form)

        if (res.meta.status !== 201) return this.$msg.error('商品添加失败')

        this.$msg.success('商品添加成功')
        this.$router.push('/goods')
      })
    }
  },
  created() {
    this.getCategories()
  },
  deactivated() {
    this.$refs.addGoodsFormRef.resetFields()
  }
}
</script>
 
<style lang="less" scoped>
.el-checkbox {
  margin: 0 5px 0 !important;
}
.add-btn {
  margin-top: 15px;
}
.preview-img {
  width: 100%;
}
</style>