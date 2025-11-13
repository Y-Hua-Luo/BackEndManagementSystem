import axios from 'axios'
import { ElMessage } from 'element-plus'
const service = axios.create({
  // 基础路径：由环境变量提供
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时时间
  timeout: 5000,
  // 请求头配置
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 配置请求头
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.token = `${token}`
    }
    // 返回配置对象
    return config
  },
  (error) => {
    ElMessage.error('请求失败')
    Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  // 成功回调
  (response) => {
    // 简化一次.data
    return response.data
  },
  // 失败回调
  (error) => {
    // 状态码
    const code = error.response.code
    let message = error.response
    // 处理http网络错误
    switch (code) {
      case 401:
        message = 'Token过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    // ElementPlus错误弹窗提示
    ElMessage.error(message)

    // 返回错误结束Promise等待
    return Promise.reject(error)
  },
)

export const request = {
  get(url: string, params = {}) {
    return service({
      url,
      method: 'get',
      params,
    })
  },
  post(url: string, data = {}) {
    return service({
      url,
      method: 'post',
      data,
    })
  },
  put(url: string, data = {}) {
    return service({
      url,
      method: 'put',
      data,
    })
  },
  delete(url: string, params = {}) {
    return service({
      url,
      method: 'delete',
      params,
    })
  },
}

export default service
