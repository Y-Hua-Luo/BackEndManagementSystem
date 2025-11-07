import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  // 所有路由抽离在routes文件内
  routes: constantRoutes,
  //滚动行为：每次路由切换后，页面会自动滚动到左上角
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
