<template>
  <ElConfigProvider :locale="zhCn">
    <!-- layout: 分页器内容, 排列顺序同书写顺序, ->右侧的内容居右显示 -->
    <!-- :current-page和:page-size必须为双向绑定时才会显示分页器,如v-model或者使用自定义事件双向绑定  -->
    <el-pagination
      :current-page="currentPage"
      :page-size="limit"
      :total="total"
      :page-sizes="[5, 7, 9]"
      :pager-count="9"
      @current-change="handleCurrentPageChange"
      @size-change="handlePageSizeChange"
      background
      layout="prev, pager, next, jumper, ->, sizes, total"
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

defineProps(['currentPage', 'limit', 'total'])

const emits = defineEmits(['page-change', 'page-size-change'])
// 页码变化时通知父组件更新
const handleCurrentPageChange = (newPage: number) => {
  emits('page-change', newPage)
}
// 每页显示数据量变化时通知父组件更新
const handlePageSizeChange = (newSize: number) => {
  emits('page-size-change', newSize)
}
</script>

<style scoped lang="scss"></style>
