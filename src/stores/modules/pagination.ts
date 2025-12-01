import { defineStore } from 'pinia'
import { ref } from 'vue'

const usePaginationStore = defineStore('Pagination', () => {
  // 当前页码
  const currentPage = ref(1)
  // 每页显示数量
  const limit = ref(5)
  // 品牌总数
  const total = ref(0)

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

  return {
    currentPage,
    limit,
    total,
    setCurrentPage,
    setLimit,
    setTotal,
  }
})

export default usePaginationStore
