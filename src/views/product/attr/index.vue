<template>
  <div>
    <!-- 分类栏 -->
    <el-card>
      <Classfication />
    </el-card>

    <!-- 属性列表 -->
    <el-card style="margin: 10px 0">
      <!-- 三级分类没选时添加属性按钮禁用 -->
      <el-button type="primary" icon="Plus" :disabled="!selectedC3Id" @click="addAttr"
        >添加属性</el-button
      >
      <Table
        v-model:attrParams="attrParams"
        v-model:addAttrDialogVisible="addAttrDialogVisible"
        ref="tableRef"
      />
    </el-card>

    <Dialog
      :tableRef="tableRef"
      v-model:addAttrDialogVisible="addAttrDialogVisible"
      v-model:attrParams="attrParams"
    />
  </div>
</template>

<script setup lang="ts">
import type { AttrInfo } from '@/api/product/attr/type'
import Classfication from '../../../components/Category/index.vue'
import Table from './table/index.vue'
import useCategoryStore from '@/stores/modules/category'
import { storeToRefs } from 'pinia'
import { onBeforeUnmount, ref } from 'vue'
import Dialog from './dialog/index.vue'

const categoryStore = useCategoryStore()
const { selectedC3Id } = storeToRefs(categoryStore)
// 表格组件实例
const tableRef = ref()

// 组件卸载时清空仓库数据
onBeforeUnmount(() => {
  categoryStore.reset()
})

// 添加/修改属性时收集的数据
const attrParams = ref<AttrInfo>({
  attrName: '', // 新增属性名称
  attrValueList: [], // 新增属性的属性值数组
  categoryId: '', // 三级分类ID
  categoryLevel: 3, // 表示是三级分类的属性
})

// 添加属性对话框的显示与隐藏
const addAttrDialogVisible = ref(false)

// 添加属性按钮点击事件
const addAttr = () => {
  // 对话框打开前先清空attrParams，并把三级分类ID赋给attrParams
  attrParams.value = {
    attrName: '', // 新增属性名称
    attrValueList: [], // 新增属性的属性值数组
    categoryId: selectedC3Id.value as number, // 三级分类ID
    categoryLevel: 3, // 表示是三级分类的属性
  }
  addAttrDialogVisible.value = true
}
</script>

<style scoped lang="scss"></style>
