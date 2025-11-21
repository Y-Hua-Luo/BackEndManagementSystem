import { defineStore } from 'pinia'
import { ref } from 'vue'
import { reqAddOrUpdateTradeMark, reqDeleteTradeMark, reqTradeMark } from '@/api/product/trademark'
import type { TradeMark } from '@/api/product/trademark/type'
import { errorMessage, successMessage } from '@/utils/notification'

const useTradeMarkStore = defineStore('TradeMark', () => {
  // 当前页码
  const currentPage = ref(1)
  // 每页显示数量
  const limit = ref(5)
  // 品牌总数
  const total = ref(0)
  // 添加/编辑品牌弹窗显隐
  const dialogVisible = ref(false)
  // 品牌列表
  const tradeMarkList = ref<TradeMark[]>([])
  // 添加/编辑品牌弹窗数据
  const tradeMarkParams = ref<TradeMark>({
    id: undefined,
    tmName: '',
    logoUrl: '',
  })

  // 设置当前页码
  const setCurrentPage = (page: number) => {
    currentPage.value = page
  }

  // 设置每页显示数量
  const setLimit = (size: number) => {
    if (limit.value !== size) {
      limit.value = size
      // 每页数量变化时回到第一页
      currentPage.value = 1
    }
  }

  // 设置品牌总数
  const setTotal = (count: number) => {
    total.value = count
  }

  // 打开添加/编辑品牌弹窗
  const openDialog = () => {
    dialogVisible.value = true
  }

  // 关闭添加/编辑品牌弹窗
  const closeDialog = () => {
    dialogVisible.value = false
  }

  // 获取品牌列表
  const getTradeMark = async (page?: number, pageSize?: number) => {
    const targetPage = page ?? currentPage.value
    const targetSize = pageSize ?? limit.value
    const result = await reqTradeMark(targetPage, targetSize)
    if (result.code === 200) {
      tradeMarkList.value = result.data.records
      setTotal(result.data.total)
    } else {
      errorMessage(result.message)
    }
  }

  // 添加品牌 / 更新品牌
  const addTradeMark = async () => {
    const result = await reqAddOrUpdateTradeMark(tradeMarkParams.value)
    if (result.code === 200) {
      if (tradeMarkParams.value.id) {
        successMessage('更新成功')
      } else {
        successMessage('添加成功')
      }
      // 清空对话框数据
      tradeMarkParams.value.tmName = ''
      tradeMarkParams.value.logoUrl = ''
      // 关闭对话框
      closeDialog()
      // 更新产品列表数据
      getTradeMark()
    } else {
      errorMessage(result.message)
    }
  }

  // 删除品牌
  const deleteTradeMark = async (id: number) => {
    const result = await reqDeleteTradeMark(id)
    if (result.code === 200) {
      successMessage('删除成功')
      // 更新产品列表数据
      getTradeMark()
    } else {
      errorMessage(result.message)
    }
  }

  return {
    currentPage,
    limit,
    total,
    dialogVisible,
    tradeMarkList,
    setCurrentPage,
    setLimit,
    setTotal,
    openDialog,
    closeDialog,
    getTradeMark,
    tradeMarkParams,
    addTradeMark,
    deleteTradeMark,
  }
})

export default useTradeMarkStore
