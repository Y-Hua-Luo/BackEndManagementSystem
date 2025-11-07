// 获取时间
export const getTime = () => {
  const hour = new Date().getHours()
  let message = ''
  if (hour < 12) message = '上午好'
  if (hour < 18) message = '下午好'
  else message = '晚上好'
  return message
}
