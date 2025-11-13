<template>
  <ElConfigProvider :locale="zhCn">
    <!-- layout: 分页器内容, 排列顺序同书写顺序, ->右侧的内容居右显示 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      background
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
    />
  </ElConfigProvider>
</template>

<script setup lang="ts">
// ElConfigProvider 组件, 用于置分页器中文包
import { ElConfigProvider } from 'element-plus'
// 引入中文包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 更改分页文字
zhCn.el.pagination.total = `共 {total} 条`
zhCn.el.pagination.goto = '跳至'
zhCn.el.pagination.pageClassifier = '页'
zhCn.el.pagination.pagesize = '条/页'

import { ref } from 'vue'
// 当前页码
const currentPage = ref(1)
// 每一页数据量
const pageSize = ref(3)
// 总数据量
const total = ref(10)
</script>

<style scoped lang="scss"></style>
