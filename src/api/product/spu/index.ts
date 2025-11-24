import request from '@/utils/request'
import type { SpuListData } from './type'

// SPU管理相关API
enum API {
  // 获取销售列表
  GET_SPU_LIST_URL = '/admin/product/spuInfo',
}

// 获取销售列表
export const reqGetSpuList = () => {
  return request.get<any, SpuListData>(API.GET_SPU_LIST_URL)
}
