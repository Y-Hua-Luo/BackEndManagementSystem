<template>
  <el-table border style="margin: 15px 0" :data="tradeMarkList">
    <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
    <el-table-column label="品牌名称">
      <!--   作用域插槽: row:data数据的每一项     -->
      <template v-slot="{ row }">
        {{ row.tmName }}
      </template>
    </el-table-column>

    <el-table-column label="品牌LOGO">
      <template v-slot="{ row }">
        <img :src="getImageUrl(row.logoUrl)" alt="" style="width: 80px; height: 80px" />
      </template>
    </el-table-column>

    <el-table-column label="品牌操作">
      <template v-slot="{ row }">
        <el-button type="warning" icon="Edit" @click="updateTradeMark(row)" />
        <el-button type="danger" icon="Delete" @click="deleteTradeMark(row)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import type { TradeMark } from '@/api/product/trademark/type.ts'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import useTradeMarkStore from '@/stores/modules/tradeMark'
import { ElMessageBox } from 'element-plus'
import { infoMessage } from '@/utils/notification'

const tradeMarkStore = useTradeMarkStore()
const { currentPage, limit, tradeMarkList, tradeMarkParams } = storeToRefs(tradeMarkStore)

// 用于拼接图片url
const VITE_APP_BASE_API = import.meta.env.VITE_APP_BASE_API

// 处理图片URL，确保能正确显示
const getImageUrl = (logoUrl: string) => {
  if (!logoUrl) return ''
  // 如果已经是完整URL，直接返回；否则拼接基础URL
  return logoUrl.startsWith('http') ? logoUrl : `${VITE_APP_BASE_API}${logoUrl}`
}

// 监听分页参数变化，重新获取数据
watch(
  [currentPage, limit],
  ([newPage, newLimit]) => {
    tradeMarkStore.getTradeMark(newPage as number, newLimit as number)
  },
  { immediate: true },
)

// 编辑品牌按钮点击事件
const updateTradeMark = (row: TradeMark) => {
  tradeMarkParams.value.id = row.id ? row.id : undefined
  tradeMarkParams.value.tmName = row.tmName
  tradeMarkParams.value.logoUrl = row.logoUrl
  tradeMarkStore.openDialog()
}

// 删除品牌按钮点击事件
const deleteTradeMark = (row: TradeMark) => {
  ElMessageBox.confirm(`确定要删除\'${row.tmName}\'的品牌信息吗？`, '确认删除', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'error',
  })
    .then(() => {
      tradeMarkStore.deleteTradeMark(row.id as number)
    })
    .catch(() => {
      infoMessage('取消删除')
    })
}
</script>

<style scoped lang="scss"></style>
