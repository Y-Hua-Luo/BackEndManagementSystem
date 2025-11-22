import type { ResponseData } from '../type'

// 登录用到的表单数据类型
export interface loginFormData {
  username: string
  password: string
}

// 登录 / 退出登录 后返回的数据类型
export interface loginResponseData extends ResponseData {
  data: string
}

// 服务器返回的用户信息类型
export interface userResponseData extends ResponseData {
  data: {
    avatar: string
    buttons: string[]
    name: string
    roles: string[]
    routes: string[]
  }
}
