import { routesInterface } from '@/types/routes'

export const routes: routesInterface[] = [
  {
    label: '仪表盘',
    value: 'board',
    path: '/',
    file: 'main/board/index'
  },
  {
    label: '常规',
    value: 'normal',
    path: '/normal',
    file: 'main/normal/index',
    children: [
      {
        label: '用户列表',
        value: 'user',
        path: '/normal/user',
        file: 'main/normal/user'
      }
    ]
  },
  {
    label: 'three',
    value: 'three',
    path: '/three',
    file: 'main/three/index',
    children: [
      {
        label: '地球',
        value: 'earthThree',
        path: '/three/earth',
        file: 'main/three/earth'
      }
    ]
  },
  {
    label: 'cesium',
    value: 'cesium',
    path: '/cesium',
    file: 'main/cesium/index',
    children: [
      {
        label: '地球',
        value: 'earthCesium',
        path: '/cesium/earth',
        file: 'main/cesium/earth'
      }
    ]
  }
]
