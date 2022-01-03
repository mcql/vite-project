import React from 'react'
import { Routes, Route, HashRouter as Router } from 'react-router-dom'
import { routes } from './const/routes'
import Main from './pages/main/index'
import Login from './pages/login'
import { routesInterface } from './types/routes'

// 路由文件 动态递归懒加载路由
const modules: Record<string, any> = import.meta.glob('./pages/**/*.tsx')
const AddRoutes = (arr: routesInterface[]) => {
  return arr.map(item => {
    // 坑：使用注释的方法 开发环境可以执行 生产环境路由找不到js文件 js文件指向错误 改用import.meta.glob获取文件夹下所有组件对象
    // const Comp = React.lazy(() => import(`./pages/${item.file}`))
    const Comp = React.lazy(modules[`./pages/${item.file}.tsx`])
    if (item.children) {
      // Suspense 异步加载效果
      return (
        <Route
          path={item.path}
          key={item.path}
          element={
            <React.Suspense fallback={<div>...loading</div>}>
              <Comp />
            </React.Suspense>
          }>
          {AddRoutes(item.children)}
        </Route>
      )
    } else {
      return (
        <Route
          path={item.path}
          key={item.path}
          element={
            <React.Suspense fallback={<div>...loading</div>}>
              <Comp />
            </React.Suspense>
          }
        />
      )
    }
  })
}

const AppRoutes = () => {
  // 路由固定写法 这里使用递归渲染
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Main />}>{AddRoutes(routes)}</Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
