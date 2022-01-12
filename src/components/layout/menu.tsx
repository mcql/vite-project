import { Menu } from '@arco-design/web-react'
import { Link } from 'react-router-dom'
import { routesInterface } from '@/types/routes'
import { menuApi } from '@/services/login'
import { useEffect, useState } from 'react'

// 菜单递归渲染
const AddMenu = (arr: routesInterface[]) => {
  return arr.map(item => {
    if (item.show) {
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
    }
  })
}

const LayoutMenu = () => {
  let [routes, setRoutes] = useState()

  useEffect(() => {
    menuApi({ page: 1, size: 999 }).then(res => {
      localStorage.getItem('bearer') &&
        setRoutes(res.payload.content[0].children)
    })
  }, [])

  return <Menu>{AddMenu(routes || [])}</Menu>
}

export default LayoutMenu
