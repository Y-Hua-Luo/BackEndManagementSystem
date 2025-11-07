// 登录用到的表单数据类型
export interface loginFormData {
  username: string
  password: string
}

// 全部接口返回的数据类型公共属性部分
export interface ResponseData {
  code: number
  message: string
  ok: boolean
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
