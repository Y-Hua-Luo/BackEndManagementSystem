<template>
  <el-table :data="attrInfoList" border style="margin: 10px 0">
    <el-table-column
      width="80px"
      label="序号"
      prop="attrName"
      align="center"
      type="index"
    ></el-table-column>
    <el-table-column label="属性名称" prop="attrName"> </el-table-column>
    <el-table-column label="属性值" prop="attrValue">
      <template v-slot="{ row }">
        <div style="display: flex; gap: 4px; flex-wrap: wrap">
          <el-tag type="primary" v-for="v in row.attrValueList" :key="v.id">{{
            v.valueName
          }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template v-slot="{ row }">
        <el-button type="warning" icon="Edit" size="small" />
        <el-button type="danger" icon="Delete" size="small" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useCategoryStore from '@/stores/modules/category'
import { ref, watch } from 'vue'
import type { AttrInfo } from '@/api/product/attr/type'
import { reqAttrInfoList } from '@/api/product/attr'

const categoryStore = useCategoryStore()
const { selectedC1Id, selectedC2Id, selectedC3Id } = storeToRefs(categoryStore)

// 所选分类的属性和属性值等数据
const attrInfoList = ref<AttrInfo[]>([])

// 获取所选分类的属性和属性值等数据
const getAttrInfoList = async () => {
  if (
    selectedC1Id.value === undefined ||
    selectedC2Id.value === undefined ||
    selectedC3Id.value === undefined
  )
    return
  const result = await reqAttrInfoList(selectedC1Id.value, selectedC2Id.value, selectedC3Id.value)
  if (result.code === 200) {
    attrInfoList.value = result.data
  }
}

// 监听selectedC3Id变化，获取所选分类的属性和属性值等数据
watch(selectedC3Id, () => {
  if (!selectedC3Id.value) {
    attrInfoList.value = []
    return
  }
  getAttrInfoList()
})
</script>

<style scoped lang="scss"></style>
