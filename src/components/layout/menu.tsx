import { Menu } from '@arco-design/web-react'
import { Link } from 'react-router-dom'
import { routes } from '@/const/routes'
import { routesInterface } from '@/types/routes'

// 菜单递归渲染
const AddMenu = (arr: routesInterface[]) => {
  return arr.map(item => {
    if (item.children) {
      return (
        <Menu.SubMenu key={item.value} title={item.label}>
          {AddMenu(item.children)}
        </Menu.SubMenu>
      )
    } else {
      return (
        <Link to={item.path} key={item.value}>
          <Menu.Item key={item.value}>{item.label}</Menu.Item>
        </Link>
      )
    }
  })
}

const LayoutMenu = () => {
  return <Menu>{AddMenu(routes)}</Menu>
}

export default LayoutMenu
