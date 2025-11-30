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
          <el-tag
            style="transition: none"
            type="primary"
            v-for="v in row.attrValueList"
            :key="v.id"
            >{{ v.valueName }}</el-tag
          >
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template v-slot="{ row }">
        <el-button type="warning" icon="Edit" size="small" @click="editAttr(row)" />
        <!-- 删除按钮及确认框 -->
        <el-popconfirm
          @confirm="deleteAttr(row.id)"
          placement="top"
          width="220"
          title="确定要删除该属性吗？"
          :hide-after="0"
        >
          <template #reference>
            <el-button type="danger" icon="Delete" size="small" />
          </template>
          <template #actions="{ confirm, cancel }">
            <el-button size="small" @click="cancel">取消</el-button>
            <el-button type="danger" size="small" @click="confirm">确定</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useCategoryStore from '@/stores/modules/category'
import { ref, watch } from 'vue'
import type { AttrInfo } from '@/api/product/attr/type'
import { reqAttrInfoList, reqDeleteAttr } from '@/api/product/attr'
import { successMessage } from '@/utils/notification'

const categoryStore = useCategoryStore()
const { selectedC1Id, selectedC2Id, selectedC3Id } = storeToRefs(categoryStore)
const attrParamsModel = defineModel<AttrInfo>('attrParams')

const addAttrDialogVisibleModel = defineModel<boolean>('addAttrDialogVisible')
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

// 暴露getAttrInfoList出去给父组件使用
defineExpose({ getAttrInfoList })

// 监听selectedC3Id变化，获取所选分类的属性和属性值等数据
watch(selectedC3Id, () => {
  if (!selectedC3Id.value) {
    attrInfoList.value = []
    return
  }
  getAttrInfoList()
})

// 编辑属性
const editAttr = (row: AttrInfo) => {
  attrParamsModel.value = JSON.parse(JSON.stringify(row))
  addAttrDialogVisibleModel.value = true
}

// 删除属性
const deleteAttr = async (attrId: number) => {
  const result = await reqDeleteAttr(attrId)
  if (result.code === 200) {
    successMessage('删除成功')
    // 更新表格数据
    getAttrInfoList()
  }
}
</script>

<style scoped lang="scss"></style>
