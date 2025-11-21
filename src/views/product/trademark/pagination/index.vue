<template>
  <ElConfigProvider :locale="zhCn">
    <!-- layout: 分页器内容, 排列顺序同书写顺序, ->右侧的内容居右显示 -->
    <el-pagination
      :current-page="currentPage"
      :page-size="limit"
      :total="total"
      :page-sizes="[5, 7, 9]"
      :pager-count="9"
      background
      layout="prev, pager, next, jumper, ->, sizes, total"
      @current-change="handleCurrentPageChange"
      @size-change="handlePageSizeChange"
    />
  </ElConfigProvider>
</template>

<script setup lang="ts">
// ElConfigProvider 组件, 用于置分页器中文包
import { ElConfigProvider } from 'element-plus'
// 引入中文包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import useTradeMarkStore from '@/stores/modules/tradeMark'
import { storeToRefs } from 'pinia'
// 更改分页文字
zhCn.el.pagination.total = `共 {total} 条`
zhCn.el.pagination.goto = '跳至'
zhCn.el.pagination.pageClassifier = '页'
zhCn.el.pagination.pagesize = '条/页'

const tradeMarkStore = useTradeMarkStore()
const { currentPage, limit, total } = storeToRefs(tradeMarkStore)

const handleCurrentPageChange = (page: number) => {
  tradeMarkStore.setCurrentPage(page)
}

const handlePageSizeChange = (size: number) => {
  tradeMarkStore.setLimit(size)
}
</script>

<style scoped lang="scss"></style>
