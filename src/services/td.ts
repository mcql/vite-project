import services from './index'

interface tdFormInterface {
  tk: string
  postStr?: {
    [key: string]: any
  }
  ds?: {
    [key: string]: any
  }
}

interface HttpResponse {
  returncode: string
  msg: string
  data?: any
  location?: any
  pois?: []
}

/*
 * 查询全国省市县
 * */
export const countryCascader = (
  params: tdFormInterface
): Promise<HttpResponse> =>
  services.get('http://api.tianditu.gov.cn/administrative', { params })

/*
 * 地名搜索
 * */
export const searchTdt = (params: tdFormInterface): Promise<HttpResponse> =>
  services.get('http://api.tianditu.gov.cn/v2/search', { params })

/*
 * 根据位置查坐标
 * */
export const getGeocoder = (params: tdFormInterface): Promise<HttpResponse> =>
  services.get('http://api.tianditu.gov.cn/geocoder', { params })
