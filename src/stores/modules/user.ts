import type { loginFormData } from '@/api/user/type'
import { defineStore } from 'pinia'
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/token'
// 引入所有路由
import { constantRoutes } from '@/router/routes'
import { ref } from 'vue'

// 用户相关业务模块：网络请求相关方法定义在api里
const useUserStore = defineStore('User', () => {
  // 用户token
  const token = ref(getToken())
  // 生成菜单所需要的路由
  const menuRoutes = constantRoutes
  // 用户名
  const userName = ref('')
  const avatar = ref('')

  // 登录获取Token并持久化存储
  const userLogin = async (data: loginFormData) => {
    const result = await reqLogin(data)
    // 登录成功，返回成功promise
    if (result.code === 200) {
      token.value = result.data
      // 将token保存到本地存储
      setToken(token.value)
      // 返回成功promise
      return 'ok'
    }
    // 登录失败，返回失败promise
    else return Promise.reject(result.message)
  }

  // 使用Token去获取用户信息
  const userInfo = async () => {
    const result = await reqUserInfo()
    if (result.code == 200) {
      userName.value = result.data.name
      avatar.value = result.data.avatar
      return 'ok'
    } else {
      return Promise.reject('获取用户信息失败')
    }
  }

  // 退出登录
  const userLogout = async () => {
    // 告诉服务器退出登录
    const result = await reqLogout()
    // 成功则清空仓库及本地存储的token
    if (result.code == 200) {
      token.value = ''
      userName.value = ''
      avatar.value = ''
      removeToken()
    }
  }

  return {
    token,
    userLogin,
    userInfo,
    menuRoutes,
    userName,
    avatar,
    userLogout,
  }
})

export default useUserStore
