import request from '@/utils/request.ts'
import type { TradeMarkResponseData } from '@/api/product/trademark/type.ts'

// 商品相关的API
enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark',
}

// 获取已有品牌的接口方法
export const reqTradeMark = (page: number, limit: number) => {
  // 拼接page和limit组成完整路径
  return request.get<any, TradeMarkResponseData>(`${API.TRADEMARK_URL}/${page}/${limit}`)
}
