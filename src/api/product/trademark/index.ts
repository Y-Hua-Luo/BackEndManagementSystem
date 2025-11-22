import request from '@/utils/request.ts'
import type { TradeMark, TradeMarkResponseData } from '@/api/product/trademark/type.ts'

// 商品相关的API
enum API {
  // 获取品牌分页列表，需拼接page和limit
  TRADEMARK_URL = '/admin/product/baseTrademark',
  // 新增品牌
  ADD_TRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改品牌
  UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除品牌，需拼接品牌id
  DELETE_TRADEMARK_URL = '/admin/product/baseTrademark/remove',
}

// 获取已有品牌的接口方法
export const reqTradeMark = (page: number, limit: number) => {
  // 拼接page和limit组成完整路径
  return request.get<any, TradeMarkResponseData>(`${API.TRADEMARK_URL}/${page}/${limit}`)
}

// 新增或修改品牌的接口方法
export const reqAddOrUpdateTradeMark = (data: TradeMark) => {
  // 根据data中是否有id来判断是新增还是修改
  if (data.id) {
    // 有id为修改
    return request.put<TradeMark, any>(API.UPDATE_TRADEMARK_URL, data)
  } else {
    // 无id为新增
    return request.post<TradeMark, any>(API.ADD_TRADEMARK_URL, data)
  }
}

// 删除品牌的接口方法
export const reqDeleteTradeMark = (id: number) => {
  return request.delete<number, any>(`${API.DELETE_TRADEMARK_URL}/${id}`)
}
