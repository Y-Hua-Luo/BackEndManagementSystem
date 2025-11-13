<template>
  <el-card>
    <!--  添加品牌按钮  -->
    <el-button size="default" type="primary" icon="Plus">添加品牌</el-button>
    <!--  表格  -->
    <Tabble />
    <!--  分页器  -->
    <Pagination />
  </el-card>
</template>

<script setup lang="ts">
import Tabble from './tabble/index.vue'
import Pagination from './pagination/index.vue'
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
