import { routesInterface } from '@/types/routes'

export const routes: routesInterface[] = [
  {
    title: '仪表盘',
    value: 'board',
    path: '/',
    file: 'main/board/index'
  },
  {
    title: '常规',
    value: 'normal',
    path: '/normal',
    file: 'main/normal/index',
    children: [
      {
        title: '用户列表',
        value: 'user',
        path: '/normal/user',
        file: 'main/normal/user'
      },
      {
        title: '菜单管理',
        value: 'menu',
        path: '/normal/menu',
        file: 'main/normal/menu'
      },
      {
        title: '表单测试',
        value: 'form',
        path: '/normal/form',
        file: 'main/normal/form'
      }
    ]
  },
  {
    title: 'three',
    value: 'three',
    path: '/three',
    file: 'main/three/index',
    children: [
      {
        title: '地球',
        value: 'earthThree',
        path: '/three/earth',
        file: 'main/three/earth'
      }
    ]
  },
  {
    title: 'cesium',
    value: 'cesium',
    path: '/cesium',
    file: 'main/cesium/index',
    children: [
      {
        title: '地球',
        value: 'earthCesium',
        path: '/cesium/earth',
        file: 'main/cesium/earth'
      }
    ]
  }
]
