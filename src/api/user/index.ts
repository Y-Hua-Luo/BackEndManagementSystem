import request from '@/utils/request'
import type { loginFormData, loginResponseData, userResponseData } from './type'

// 用户相关的API
enum API {
  // 登录
  LOGIN_URL = '/admin/acl/index/login',
  // 获取用户信息
  USERINFO_URL = '/admin/acl/index/info',
  // 登出
  LOGOUT_URL = '/admin/acl/index/logout',
}

// 登录接口
export const reqLogin = (data: loginFormData) => {
  // 双泛型参数：分别指定请求体和响应体的类型
  return request.post<loginFormData, loginResponseData>(API.LOGIN_URL, data)
}

// 获取用户信息接口
export const reqUserInfo = () => {
  return request.get<any, userResponseData>(API.USERINFO_URL)
}

// 退出登录接口
export const reqLogout = () => {
  return request.post<any, any>(API.LOGOUT_URL)
}
