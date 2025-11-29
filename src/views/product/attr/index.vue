<template>
  <div>
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

    <!-- 添加属性对话框 -->
    <el-dialog
      :close-on-click-modal="false"
      v-model="addAttrDialogVisible"
      title="添加属性"
      width="1000px"
    >
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input v-model="attrParams.attrName" placeholder="请输入属性名称" />
        </el-form-item>
      </el-form>
      <el-button
        @click="addAttrValue"
        type="primary"
        icon="Plus"
        :disabled="!attrParams.attrName.trim()"
        >添加属性值</el-button
      >
      <el-table :data="attrParams.attrValueList" border style="margin: 10px 0">
        <el-table-column label="序号" align="center" type="index" width="80px"></el-table-column>
        <el-table-column label="属性值">
          <template v-slot="{ row, $index }">
            <!-- 动态将组件实例放到inputArr中，通过.focus()方法使其聚焦 -->
            <el-input
              v-input-focus
              v-if="row.inputFlag"
              @blur="toggleEdit($index, row)"
              v-model="row.valueName"
              placeholder="请输入属性值"
            >
              {{ row.valueName }}
            </el-input>
            <div v-else @click="toggleEdit($index, row)">{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="325px">
          <template v-slot="{ $index }">
            <el-button type="danger" icon="Delete" size="small" @click="deleteAttrValue($index)" />
          </template>
        </el-table-column>
      </el-table>

      <template #footer>
        <el-button
          :disabled="attrParams.attrValueList.length === 0"
          @click="saveAttrValue"
          type="primary"
          >保存</el-button
        >
        <el-button @click="addAttrDialogVisible = false">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { AttrInfo, AttrValue } from '@/api/product/attr/type'
import Classfication from '../../../components/Category/index.vue'
import Table from './table/index.vue'
import useCategoryStore from '@/stores/modules/category'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { errorMessage, successMessage } from '@/utils/notification'
import { reqAddOrUpdateAttr } from '@/api/product/attr'

const categoryStore = useCategoryStore()
const { selectedC3Id } = storeToRefs(categoryStore)
// 表格组件实例
const tableRef = ref()

// 自定义指令，input自动获焦点
const vInputFocus = {
  mounted: (el: any) => {
    el.querySelector('input').focus()
  },
}

// 组件挂载时如果有三级分类id则获取数据
onMounted(() => {
  // 更新表格数据
  tableRef.value.getAttrInfoList()
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

// 添加属性值按钮点击事件
const addAttrValue = () => {
  const attrValueListLength = attrParams.value.attrValueList.length
  const lastAttrValueName = attrParams.value.attrValueList[attrValueListLength - 1]?.valueName
  // 只有属性值不为空时才允许继续添加
  if (attrValueListLength && !lastAttrValueName) {
    errorMessage('属性值不能为空')
    return
  }
  // 添加属性值
  attrParams.value.attrValueList.push({
    valueName: '',
    inputFlag: true, // true时添加属性值状态为输入框，false时为div文本
  })
}

// 删除属性值
const deleteAttrValue = (index: number) => {
  attrParams.value.attrValueList.splice(index, 1)
}

// 保存按钮点击事件
const saveAttrValue = async () => {
  // 是否有属性名称
  const hasAttrName = Boolean(attrParams.value.attrName)
  // 属性值列表长度
  const attrValueListLength = attrParams.value.attrValueList.length
  // 是否有属性值：最后一个属性值也需要有值
  const hasAttrValue =
    attrParams.value.attrValueList.length &&
    attrParams.value.attrValueList[attrValueListLength - 1]?.valueName
  if (!hasAttrName || !hasAttrValue) {
    errorMessage('属性名称和属性值不能为空')
    return
  }
  // 保存提交
  const result = await reqAddOrUpdateAttr(attrParams.value)
  if (result.code === 200) {
    successMessage('保存成功')
    // 更新表格数据
    tableRef.value.getAttrInfoList()
    // 关闭对话框
    addAttrDialogVisible.value = false
  }
}

// 切换编辑状态
const toggleEdit = ($index: number, row: AttrValue) => {
  // inputFlag为true时表示当前是input编辑状态，需判断属性值合法性
  if (row.inputFlag) {
    // 情况一：属性值为空时不切换编辑状态
    if (row.valueName.trim() === '') {
      errorMessage('属性值不能为空')
      // 删除当前编辑的属性值
      deleteAttrValue($index)
      return
    }
    // 情况二：属性值重复时提示且不允许添加
    const repeat = attrParams.value.attrValueList.find((item) => {
      // 排除当前编辑的属性值再进行排重
      if (item != row) {
        return item.valueName === row.valueName
      }
    })
    if (repeat) {
      errorMessage('属性值重复')
      // 删除当前编辑的属性值
      deleteAttrValue($index)
      return
    }
  }
  // 点击属性值时，切换编辑状态
  row.inputFlag = !row.inputFlag
}
</script>

<style scoped lang="scss"></style>
