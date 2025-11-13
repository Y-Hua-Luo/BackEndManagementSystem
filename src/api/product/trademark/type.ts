// 全部接口返回的数据类型公共属性部分
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 品牌信息
export interface TradeMark {
  createTime: string
  updateTime: string
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
