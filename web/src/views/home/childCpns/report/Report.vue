<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片试图 -->
    <el-card>
      <div id="main" style="width: 750px;height:450px;"></div>
    </el-card>
  </div>
</template>
 
<script>
import echarts from 'echarts'
import _ from 'lodash'
import { getReports } from 'network/home'

export default {
  name: "Report",
  data() {
    return {
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  async mounted() {
    let myChart = echarts.init(document.querySelector('#main'))

    const res = await getReports()
    if (res.meta.status !== 200) return

    const result = _.merge(res.data, this.options)

    myChart.setOption(result)
  }
}
</script>
 
<style lang="less" scoped>
</style>