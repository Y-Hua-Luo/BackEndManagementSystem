<template>
  <div>
    <el-card>
      <Classfication />
    </el-card>

    <el-card style="margin: 10px 0">
      <el-button type="primary" icon="Plus">添加属性</el-button>
      <Table />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import Classfication from '../../../components/Category/index.vue'
import Table from './table/index.vue'
</script>

<style scoped lang="scss"></style>
