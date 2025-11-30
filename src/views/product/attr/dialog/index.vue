<template>
  <!-- 添加属性对话框 -->
  <el-dialog
    :close-on-click-modal="false"
    v-model="addAttrDialogVisibleModel"
    title="添加属性"
    width="1000px"
  >
    <el-form :inline="true">
      <el-form-item label="属性名称">
        <el-input v-model="attrParamsModel!.attrName" placeholder="请输入属性名称" />
      </el-form-item>
    </el-form>
    <el-button
      @click="addAttrValue"
      type="primary"
      icon="Plus"
      :disabled="!attrParamsModel!.attrName.trim()"
      >添加属性值</el-button
    >
    <el-table :data="attrParamsModel!.attrValueList" border style="margin: 10px 0">
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
        :disabled="attrParamsModel!.attrValueList.length === 0"
        @click="saveAttrValue"
        type="primary"
        >保存</el-button
      >
      <el-button @click="addAttrDialogVisibleModel = false">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reqAddOrUpdateAttr } from '@/api/product/attr'
import type { AttrInfo, AttrValue } from '@/api/product/attr/type'
import { errorMessage, successMessage } from '@/utils/notification'

const props = defineProps<{ tableRef: any }>()

const attrParamsModel = defineModel<AttrInfo>('attrParams')
const addAttrDialogVisibleModel = defineModel<boolean>('addAttrDialogVisible')

// 自定义指令，input自动获焦点
const vInputFocus = {
  mounted: (el: any) => {
    el.querySelector('input').focus()
  },
}

// 添加属性值按钮点击事件
const addAttrValue = () => {
  const attrValueListLength = attrParamsModel.value!.attrValueList.length
  const lastAttrValueName = attrParamsModel.value!.attrValueList[attrValueListLength - 1]?.valueName
  // 只有属性值不为空时才允许继续添加
  if (attrValueListLength && !lastAttrValueName) {
    errorMessage('属性值不能为空')
    return
  }
  // 添加属性值
  attrParamsModel.value!.attrValueList.push({
    valueName: '',
    inputFlag: true, // true时添加属性值状态为输入框，false时为div文本
  })
}

// 删除属性值
const deleteAttrValue = (index: number) => {
  attrParamsModel.value!.attrValueList.splice(index, 1)
}

// 保存按钮点击事件
const saveAttrValue = async () => {
  // 是否有属性名称
  const hasAttrName = Boolean(attrParamsModel.value!.attrName)
  // 属性值列表长度
  const attrValueListLength = attrParamsModel.value!.attrValueList.length
  // 是否有属性值：最后一个属性值也需要有值
  const hasAttrValue =
    attrParamsModel.value!.attrValueList.length &&
    attrParamsModel.value!.attrValueList[attrValueListLength - 1]?.valueName
  if (!hasAttrName || !hasAttrValue) {
    errorMessage('属性名称和属性值不能为空')
    return
  }
  // 保存提交
  const result = await reqAddOrUpdateAttr(attrParamsModel.value as AttrInfo)
  if (result.code === 200) {
    successMessage('保存成功')
    // 更新表格数据
    props.tableRef.getAttrInfoList()
    // 关闭对话框
    addAttrDialogVisibleModel.value = false
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
    const repeat = attrParamsModel.value!.attrValueList.find((item) => {
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
