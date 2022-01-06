import { Menu } from '@arco-design/web-react'
import { Link } from 'react-router-dom'
import { routesInterface } from '@/types/routes'
import { useMount } from 'ahooks'
import { menuApi } from '@/services/login'
import { useState } from 'react'

// 菜单递归渲染
const AddMenu = (arr: routesInterface[]) => {
  return arr.map(item => {
    if (item.children) {
      return (
        <Menu.SubMenu key={item.value} title={item.title}>
          {AddMenu(item.children)}
        </Menu.SubMenu>
      )
    } else {
      return (
        <Link to={item.path} key={item.value}>
          <Menu.Item key={item.value}>{item.title}</Menu.Item>
        </Link>
      )
    }
  })
}

const LayoutMenu = () => {
  let [routes, setRoutes] = useState([])

  useMount(async () => {
    let res = await menuApi({ page: 1, size: 999 })
    setRoutes(res.payload.content)
  })

  return <Menu>{AddMenu(routes)}</Menu>
}

export default LayoutMenu
