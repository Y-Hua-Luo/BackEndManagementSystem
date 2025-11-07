import { defineStore } from 'pinia'
import { ref } from 'vue'

// Layout布局设置仓库
const useLayoutSettingsStore = defineStore('Setting', () => {
  // 菜单是否折叠
  const isLayoutMenuFold = ref(false)
  // 刷新标记
  const isRefresh = ref(false)

  return {
    isLayoutMenuFold,
    isRefresh,
  }
})

export default useLayoutSettingsStore
