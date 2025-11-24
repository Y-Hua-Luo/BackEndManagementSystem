import { reqAttrInfoList, reqC1, reqC2, reqC3 } from '@/api/product/attr'
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

  // 所选分类的属性和属性值等数据
  const attrInfoList = ref<any[]>()

  // 获取一级分类数据
  const getC1 = async () => {
    const result = await reqC1()
    if (result.code === 200) {
      c1Arr.value = result.data
    }
  }

  // 获取二级分类数据
  const getC2 = async () => {
    console.log(1)
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
      console.log(result)
      attrInfoList.value = result.data
    }
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
    getAttrInfoList,
  }
})

export default useCategoryStore
