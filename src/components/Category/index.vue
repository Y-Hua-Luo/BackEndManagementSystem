<template>
  <div class="container">
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <!-- v-model：将el-option的:value值赋给selectedC1Id -->
        <el-select
          v-model="selectedC1Id"
          style="width: 200px"
          placeholder="请选择"
          @change="handleC1Change"
        >
          <el-option v-for="c1 in c1Arr" :key="c1.id" :label="c1.name" :value="c1.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <!-- v-model：将el-option的:value值赋给selectedC2Id -->
        <el-select
          v-model="selectedC2Id"
          placeholder="请选择"
          style="width: 200px"
          @change="handleC2Change"
        >
          <el-option v-for="c2 in c2Arr" :key="c2.id" :label="c2.name" :value="c2.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="selectedC3Id"
          placeholder="请选择"
          style="width: 200px"
          @change="categoryStore.getAttrInfoList()"
        >
          <el-option v-for="c3 in c3Arr" :key="c3.id" :label="c3.name" :value="c3.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useCategoryStore from '@/stores/modules/category'
import { storeToRefs } from 'pinia'

const categoryStore = useCategoryStore()
const { selectedC1Id, selectedC2Id, selectedC3Id, c1Arr, c2Arr, c3Arr } = storeToRefs(categoryStore)

// 组件挂载时获取一级分类数据
onMounted(() => {
  categoryStore.getC1()
})

// 一级分类改变时触发事件
const handleC1Change = () => {
  // 清空二级分类和三级分类，三级分类还要清空数据
  selectedC2Id.value = undefined
  selectedC3Id.value = undefined
  c3Arr.value = []
  categoryStore.getC2()
}

// 二级分类改变时触发事件
const handleC2Change = () => {
  // 清空三级分类
  selectedC3Id.value = undefined
  categoryStore.getC3()
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
}
</style>
