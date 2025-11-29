import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import type { CategoryObj } from '@/api/product/attr/type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useCategoryStore = defineStore('Category', () => {
  // 一级分类数据
  const c1Arr = ref<CategoryObj[]>()
  // 所选的一级分类的id
  const selectedC1Id = ref<number>()

  // 二级分类数据
  const c2Arr = ref<CategoryObj[]>()
  // 所选的二级分类的id
  const selectedC2Id = ref<number>()

  // 三级分类数据
  const c3Arr = ref<CategoryObj[]>()
  // 所选的三级分类的id
  const selectedC3Id = ref<number>()

  // 获取一级分类数据
  const getC1 = async () => {
    const result = await reqC1()
    if (result.code === 200) {
      c1Arr.value = result.data
    }
  }

  // 获取二级分类数据
  const getC2 = async () => {
    if (selectedC1Id.value === undefined) return
    const result = await reqC2(selectedC1Id.value)
    if (result.code === 200) {
      c2Arr.value = result.data
    }
  }

  // 获取三级分类数据
  const getC3 = async () => {
    if (selectedC2Id.value === undefined) return
    const result = await reqC3(selectedC2Id.value)
    if (result.code === 200) {
      c3Arr.value = result.data
    }
  }

  // 清空仓库数据
  const reset = () => {
    selectedC1Id.value = undefined
    selectedC2Id.value = undefined
    selectedC3Id.value = undefined
    c1Arr.value = undefined
    c2Arr.value = undefined
    c3Arr.value = undefined
  }

  return {
    c1Arr,
    selectedC1Id,
    c2Arr,
    selectedC2Id,
    c3Arr,
    selectedC3Id,
    getC1,
    getC2,
    getC3,
    reset,
  }
})

export default useCategoryStore
