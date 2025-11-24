import request from '@/utils/request'
import type { AttrInfo, AttrInfoResponseData, CategoryResponseData } from './type'

// 属性管理相关API
enum API {
  // 获取一级分类
  CATEGORY1_URL = '/admin/product/getCategory1',
  // 获取二级分类，需拼接分类1id
  CATEGORY2_URL = '/admin/product/getCategory2',
  // 获取三级分类，需拼接分类2id
  CATEGORY3_URL = '/admin/product/getCategory3',
  // 获取所选分类的属性和属性值，需拼接c1id,c2id,c3id
  ATTR_INFO_URL = '/admin/product/attrInfoList',
  // 新增属性 / 修改属性
  ADD_OR_UPDATE_ATTR_URL = '/admin/product/attrInfo',
  // 删除属性，需拼接attrId
  DELETE_ATTR_URL = '/admin/product/deleteAttr',
}

// 获取一级分类
export const reqC1 = () => {
  return request.get<any, CategoryResponseData>(API.CATEGORY1_URL)
}

// 获取二级分类
export const reqC2 = (c1Id: number) => {
  return request.get<any, CategoryResponseData>(`${API.CATEGORY2_URL}/${c1Id}`)
}

// 获取三级分类
export const reqC3 = (c2Id: number) => {
  return request.get<any, CategoryResponseData>(`${API.CATEGORY3_URL}/${c2Id}`)
}

// 获取所选分类属性
export const reqAttrInfoList = (c1Id: number, c2Id: number, c3Id: number) => {
  return request.get<any, AttrInfoResponseData>(`${API.ATTR_INFO_URL}/${c1Id}/${c2Id}/${c3Id}`)
}

// 新增属性 / 修改属性
export const reqAddOrUpdateAttr = (data: AttrInfo) => {
  return request.post<AttrInfo, any>(API.ADD_OR_UPDATE_ATTR_URL, data)
}

// 删除属性
export const reqDeleteAttr = (attrId: number) => {
  return request.delete<any, any>(`${API.DELETE_ATTR_URL}/${attrId}`)
}
