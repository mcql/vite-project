import services from './index'

export interface loginParamsInterface {
  username: string
  password: string
}

interface HttpResponse {
  code: number
  msg: string
  payload: any
}

export const loginApi = (params: loginParamsInterface): Promise<HttpResponse> =>
  services.get('/vite-api/api/login', { params })

export const uploadApi = (params: any): Promise<HttpResponse> => {
  let formDataParams = new FormData()
  formDataParams.append('file', params)
  return services.post('/vite-api/api/upload', formDataParams, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
