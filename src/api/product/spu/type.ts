import type { ResponseData } from '@/api/type'

export interface Spu {
  id: number
  name: string
}

// spu列表数据
export interface SpuListData extends ResponseData {
  data: Spu[]
}
