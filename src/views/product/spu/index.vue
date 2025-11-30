<template>
  <div>
    <!-- 分类栏 -->
    <el-card>
      <Category />
    </el-card>

    <el-card style="margin: 10px 0">
      <!-- 三级分类没选时添加属性按钮禁用 -->
      <el-button type="primary" icon="Plus">添加SPU</el-button>
      <Table />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import Table from './table/index.vue'
</script>

<style scoped lang="scss"></style>
