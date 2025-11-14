<template>
  <el-table border style="margin: 15px 0" :data="tradeMarkArr">
    <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
    <el-table-column label="品牌名称">
      <!--   作用域插槽: row:data数据的每一项     -->
      <template v-slot="{ row }">
        {{ row.tmName }}
      </template>
    </el-table-column>

    <el-table-column label="品牌LOGO">
      <template v-slot="{ row }">
        <img :src="VITE_APP_BASE_API + row.logoUrl" alt="" style="width: 80px; height: 80px" />
      </template>
    </el-table-column>

    <el-table-column label="品牌操作">
      <template>
        <el-button type="warning" icon="Edit" />
        <el-button type="danger" icon="Delete" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { reqTradeMark } from '@/api/product/trademark'
import { onMounted, ref, watch } from 'vue'
import type { TradeMark } from '@/api/product/trademark/type.ts'

const props = defineProps(['currentPage', 'limit'])

const totalModel = defineModel<number>('total')

// 用于拼接图片url
const VITE_APP_BASE_API = import.meta.env.VITE_APP_BASE_API
// 存储获取到的品牌信息
const tradeMarkArr = ref<TradeMark[]>([])

// 获取所有品牌信息
const getTradeMark = async (page: number, limit: number) => {
  const result = await reqTradeMark(page, limit)
  // 获取成功存储品牌信息 + 修改父组件total值
  if (result.code == 200) {
    tradeMarkArr.value = result.data.records
    totalModel.value = result.data.total
  }
}

// 初始化时获取数据
onMounted(async () => {
  getTradeMark(props.currentPage, props.limit)
})

// 监听分页参数变化，重新获取数据
watch(
  () => [props.currentPage, props.limit],
  ([newPage, newLimit]) => {
    getTradeMark(newPage, newLimit)
  },
  { immediate: false },
)
</script>

<style scoped lang="scss"></style>
