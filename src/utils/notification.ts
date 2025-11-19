import { ElMessage, ElNotification } from 'element-plus'

// 成功通知
export const successNotification = (title: string, message: string) => {
  ElNotification({
    title,
    message,
    type: 'success',
  })
}

// 失败通知
export const errorNotification = (title: string, message: string) => {
  ElNotification({
    title,
    message,
    type: 'error',
  })
}

// 成功提示
export const successMessage = (message: string) => {
  ElMessage({
    message,
    type: 'success',
  })
}

// 失败提示
export const errorMessage = (message: string) => {
  ElMessage({
    message,
    type: 'error',
  })
}
