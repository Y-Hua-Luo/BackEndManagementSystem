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
        <img :src="getImageUrl(row.logoUrl)" alt="" style="width: 80px; height: 80px" />
      </template>
    </el-table-column>

    <el-table-column label="品牌操作">
      <template v-slot="{ row }">
        <el-button type="warning" icon="Edit" @click="updateTradeMark" />
        <el-button type="danger" icon="Delete" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { reqTradeMark } from '@/api/product/trademark'
import { onMounted, ref, watch } from 'vue'
import type { TradeMark } from '@/api/product/trademark/type.ts'

const props = defineProps<{ currentPage: number; limit: number }>()
// 总数据量: 由父组件提供给子表格组件和分页器组件使用
const totalModel = defineModel<number>('total')
// 控制 添加品牌dialog 显示/隐藏
const dialogVisible = defineModel<boolean>('modelValue', { default: false })

// 用于拼接图片url
const VITE_APP_BASE_API = import.meta.env.VITE_APP_BASE_API
// 存储获取到的品牌信息
const tradeMarkArr = ref<TradeMark[]>([])

// 处理图片URL，确保能正确显示
const getImageUrl = (logoUrl: string) => {
  if (!logoUrl) return ''
  // 如果已经是完整URL，直接返回；否则拼接基础URL
  return logoUrl.startsWith('http') ? logoUrl : `${VITE_APP_BASE_API}${logoUrl}`
}

// 获取所有品牌信息(默认第一页)
const getTradeMark = async (page = 1) => {
  const result = await reqTradeMark(page, props.limit)
  // 获取成功存储品牌信息 + 修改父组件total值
  if (result.code == 200) {
    tradeMarkArr.value = result.data.records
    totalModel.value = result.data.total
  }
}

// 暴露getTradeMark方法给父组件使用
defineExpose({
  getTradeMark,
})

// 初始化时获取数据
onMounted(async () => {
  getTradeMark(props.currentPage)
})

// 监听分页参数变化，重新获取数据
watch(
  () => [props.currentPage, props.limit],
  ([newPage]) => {
    getTradeMark(newPage as number)
  },
  { immediate: false },
)

// 编辑品牌按钮点击事件
const updateTradeMark = () => {
  dialogVisible.value = true
}
</script>

<style scoped lang="scss"></style>
