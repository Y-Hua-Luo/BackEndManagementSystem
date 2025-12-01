import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { reqAddOrUpdateTradeMark, reqDeleteTradeMark, reqTradeMark } from '@/api/product/trademark'
import type { TradeMark } from '@/api/product/trademark/type'
import { errorMessage, successMessage } from '@/utils/notification'
import usePaginationStore from './pagination'

const useTradeMarkStore = defineStore('TradeMark', () => {
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

  const paginationStore = usePaginationStore()
  const { currentPage, limit } = storeToRefs(paginationStore)

  // 动态获取完整logoUrl
  const fullLogoUrl = computed(() => {
    if (!tradeMarkParams.value.logoUrl) return ''
    if (tradeMarkParams.value.logoUrl.startsWith('http')) {
      return
    }
    return import.meta.env.VITE_APP_BASE_API + tradeMarkParams.value.logoUrl
  })

  // 同步完整logoUrl到tradeMarkParams
  watch(fullLogoUrl, (newVal, oldVal) => {
    // 只有新旧值不一样时才进行同步
    if (newVal && newVal !== oldVal) {
      tradeMarkParams.value.logoUrl = newVal
    }
  })

  // 重置tradeMarkParams数据
  const resetTradeMarkParams = () => {
    tradeMarkParams.value = {
      id: undefined,
      tmName: '',
      logoUrl: '',
    }
  }

  // 监听dialogVisible变化，从true变为false时清空对话框数据
  watch(dialogVisible, (newVal, oldVal) => {
    if (!newVal && oldVal) {
      resetTradeMarkParams()
    }
  })

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
      paginationStore.setTotal(result.data.total)
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
    dialogVisible,
    tradeMarkList,
    openDialog,
    closeDialog,
    getTradeMark,
    tradeMarkParams,
    addTradeMark,
    deleteTradeMark,
  }
})

export default useTradeMarkStore
