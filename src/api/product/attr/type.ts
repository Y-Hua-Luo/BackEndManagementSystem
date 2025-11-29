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

// 属性值对象类型
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  inputFlag?: boolean
}

// 属性信息对象类型
export interface AttrInfo {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValue[]
  flag?: boolean
}

// 属性信息对象列表类型
export interface AttrInfoResponseData extends ResponseData {
  data: AttrInfo[]
}
