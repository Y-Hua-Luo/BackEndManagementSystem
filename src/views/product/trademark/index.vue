<template>
  <div>
    <el-card>
      <!--  添加品牌按钮  -->
      <el-button size="default" type="primary" icon="Plus" @click="addTradeMark"
        >添加品牌</el-button
      >
      <!--  表格  -->
      <Tabble />
      <!--  分页器  -->
      <Pagination />
    </el-card>

    <!--  添加品牌 dialog  -->
    <Dialog />
  </div>
</template>

<script setup lang="ts">
import Tabble from './tabble/index.vue'
import Pagination from './pagination/index.vue'
import Dialog from './dialog/index.vue'
import useTradeMarkStore from '@/stores/modules/tradeMark'

const tradeMarkStore = useTradeMarkStore()

// 添加品牌按钮点击事件
const addTradeMark = () => {
  tradeMarkStore.openDialog()
}
</script>

<style scoped lang="scss">
:deep(.el-button--primary) {
  background: #409eff;
  color: #fff;
  padding: 10px;
}

:deep(.el-button--primary:hover) {
  background: #79bbff;
}
</style>
