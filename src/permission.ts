// 路由鉴权
import router from './router'
// 引入进度条插件及对应的css样式
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 关闭进度条加载时转圈
nprogress.configure({ showSpinner: false })
// 引入user仓库
import useUserStore from '@/stores/modules/user.ts'
import setting from '@/setting.ts'

// 全局前置路由守卫
router.beforeEach(async (to) => {
  // 切换路由时，进度条开始
  nprogress.start()
  // 获取token
  const userStore = useUserStore()
  const token = userStore.token
  // 获取用户信息
  // 每次路由切换都会发请求重新获取，不存储在本地的原因是如果用户token过期，路由切换的时候并不会检测出来从而使得页面跳转至登录页
  const userName = userStore.userName
  // 已登录：有token，禁止访问/login，其余放行
  if (token) {
    if (to.path == '/login') {
      // 返回 false 以取消导航
      return false
    } else {
      // 如果有用户信息，放行
      if (userName) {
        return
      }
      // 没有用户信息，获取用户信息
      else {
        try {
          await userStore.userInfo()
          return
        } catch {
          // 拿不到用户信息：token无效或过期，清空用户信息，跳转登录页
          await userStore.userLogout()
          return { path: '/login', query: { redirect: to.path } }
        }
      }
    }
  }
  // 未登录：无token，只能访问/login
  else {
    if (to.path == '/login') {
      return
    }
    return '/login'
  }
})

// 全局后置路由守卫
router.afterEach((to) => {
  // 切换路由结束，进度条完成
  nprogress.done()
  // 跳转结束，设置页面标题为 项目名称 + 路由
  document.title = `${setting.title} - ${to.meta.title}`
})

export default router
