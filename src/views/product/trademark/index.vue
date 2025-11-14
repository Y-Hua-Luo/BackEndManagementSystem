<template>
  <el-card>
    <!--  添加品牌按钮  -->
    <el-button size="default" type="primary" icon="Plus">添加品牌</el-button>
    <!--  表格  -->
    <Tabble :currentPage="currentPage" :limit="limit" v-model:total="total" />
    <!--  分页器  -->
    <Pagination v-model:currentPage="currentPage" v-model:limit="limit" :total="total" />
  </el-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Tabble from './tabble/index.vue'
import Pagination from './pagination/index.vue'

// 当前页码: 由父组件提供给子表格组件和分页器组件使用
const currentPage = ref(1)
// 每一页数据量: 由父组件提供给子表格组件和分页器组件使用
const limit = ref(5)
// 总数据量: 由父组件提供给子表格组件和分页器组件使用
const total = ref(100)

// 监听每页数量变化，重置页码
watch(
  limit,
  (newSize, oldSize) => {
    if (oldSize !== undefined && newSize !== oldSize) {
      currentPage.value = 1
    }
  },
  { flush: 'post' },
)
</script>

<style scoped lang="scss">
:deep(.el-button--primary) {
  background: #409eff;
  color: #fff;
  padding: 10px;
}

:deep(.el-button--primary:hover) {
  background: #79bbff;
}
</style>
