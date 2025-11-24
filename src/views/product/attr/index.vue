<template>
  <div>
    <el-card>
      <Classfication />
    </el-card>

    <el-card style="margin: 10px 0">
      <!-- 三级分类没选时添加属性按钮禁用 -->
      <el-button type="primary" icon="Plus" :disabled="!selectedC3Id" @click="addAttr"
        >添加属性</el-button
      >
      <Table />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import Classfication from '../../../components/Category/index.vue'
import Table from './table/index.vue'
import useCategoryStore from '@/stores/modules/category'
import { storeToRefs } from 'pinia'

const categoryStore = useCategoryStore()
const { selectedC3Id } = storeToRefs(categoryStore)

// 添加属性按钮点击事件
const addAttr = async () => {
  console.log(12)
}
</script>

<style scoped lang="scss"></style>
