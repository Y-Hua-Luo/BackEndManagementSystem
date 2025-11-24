import type { ResponseData } from '@/api/type'

// 单个一二三级分类对象类型
export interface CategoryObj {
  id: number
  name: string
  category1Id?: number
  category2Id?: number
}

// 所有分类对象类型
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}
