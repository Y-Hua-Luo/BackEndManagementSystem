import type { ResponseData } from '@/api/type'

// 品牌信息
export interface TradeMark {
  createTime?: string
  updateTime?: string
  id?: number
  tmName: string
  logoUrl: string
}

// 请求品牌信息返回的数据类型
export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: TradeMark[]
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
