import { Outlet, useNavigate } from 'react-router-dom'
import { Layout } from '@arco-design/web-react'
import Menu from '@/components/layout/menu'
import { base } from '@/const/base'
import HeaderComponent from '@/components/layout/header'
import { useEffect } from 'react'
const main = () => {
  const navigate = useNavigate()
  useEffect(() => {
    !localStorage.getItem('bearer') && navigate('/login')
  }, [])

  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Header style={{ height: base.headHeight }}>
        <HeaderComponent />
      </Layout.Header>
      <Layout style={{ height: `calc(100vh - ${base.headHeight})` }}>
        <Layout.Sider style={{ width: base.menuWidth }}>
          <Menu />
        </Layout.Sider>
        <Layout.Content
          style={{ width: `calc(100vw - ${base.menuWidth})`, padding: '10px' }}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default main
