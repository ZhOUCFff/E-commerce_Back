<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索框 -->
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入搜索内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 订单列表表格 -->
      <el-table :data="orderList" border stripe>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款" prop="order_pay">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.order_pay == '1'">已付款</el-tag>
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            <span>{{scope.row.create_time | getDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-edit"
              @click="editAdressClick(scope.row)"
            ></el-button>
            <el-button size="small" type="success" icon="el-icon-truck" @click="showLogistics"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页模块 -->
      <el-pagination
        @size-change="pagesizeChange"
        @current-change="pagenumChange"
        :current-page="orderListParams.pagenum"
        :page-sizes="[5,10]"
        :page-size="orderListParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 修改地址对话框 -->
    <el-dialog
      title="修改地址"
      :visible.sync="addressDialogVisible"
      width="50%"
      @close="addressDialogClose"
    >
      <el-form :model="addressForm" :rules="addressRules" ref="addressFormRef" label-width="100px">
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader
            v-model="addressForm.address1"
            :options="cityData"
            :props="cascaderProps"
            @change="handleChange"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model.trim="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addressDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editAdress">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 物流信息对话框 -->
    <el-dialog title="物流信息" :visible.sync="logisticsDialogVisible" width="50%">
      <el-timeline :reverse="false">
        <el-timeline-item
          v-for="(activity, index) in logistics"
          :key="index"
          :timestamp="activity.time"
        >{{activity.context}}</el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>
 
<script>
import { getOrderList, getLogistics } from 'network/home'
import { formatDate } from 'common//utils'

//省市区/县数据
import cityData from 'assets/js/citydata.js'

export default {
  name: "OrderList",
  data() {
    return {
      orderList: [],
      orderListParams: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      addressDialogVisible: false,
      cascaderProps: {
        expandTrigger: 'hover',
        value: 'value',
        label: 'label',
        children: 'children',
        emitPath: true
      },
      cityData,
      addressForm: {
        address1: null,
        address2: ''
      },
      addressRules: {
        address1: [{
          required: true,
          message: '请选择省市区/县',
          trigger: 'blur'
        }],
        address2: [{
          required: true,
          message: '请填写详细地址',
          trigger: 'blur'
        }]
      },
      logisticsDialogVisible: false,
      logistics: []
    }
  },
  filters: {
    getDate(value) {
      const date = new Date(value)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  methods: {
    async getOrderList() {
      const res = await getOrderList(this.orderListParams)
      if (res.meta.status !== 200) return
      this.total = res.data.total
      this.orderList = res.data.goods
    },
    pagesizeChange(pagesize) {
      this.orderListParams.pagesize = pagesize
      this.getOrderList()
    },
    pagenumChange(pagenum) {
      this.orderListParams.pagenum = pagenum
      this.getOrderList()
    },
    // 修改地址
    editAdressClick() {
      this.addressDialogVisible = true
    },
    editAdress() {
      this.$refs.addressFormRef.validate(valid => {
        console.log(valid);
      })
    },
    addressDialogClose() {
      this.$refs.addressFormRef.resetFields()
    },
    // 显示物流信息
    async showLogistics() {
      const res = await getLogistics()
      if (res.meta.status !== 200) return this.$msg.error('物流信息获取失败')
      this.logistics = res.data
      this.logisticsDialogVisible = true
    },
    handleChange() {
      console.log(this.addressForm.address1);
    }
  },
  created() {
    this.getOrderList()
  }
}
</script>
 
<style lang="less" scoped>
</style>