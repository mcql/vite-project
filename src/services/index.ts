import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { Message } from '@arco-design/web-react'

const services: AxiosInstance = axios.create({
  baseURL: '',
  timeout: 30000
})

services.interceptors.request.use((config: any) => {
  localStorage.getItem('bearer') &&
    (config.headers.authorization = `Bearer ${localStorage.getItem('bearer')}`)
  return config
})

services.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      if (response.data.code === 401) {
        Message.error('token失效 请重新登录')
        localStorage.removeItem('bearer')
        window.location.href = '/#/login'
      }
      return response.data
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default services
