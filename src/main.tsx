import React from 'react'
import ReactDOM from 'react-dom'
import AppRoutes from './router'
import '@arco-design/web-react/dist/css/arco.css'
import './index.css'

ReactDOM.render(
  // <React.StrictMode>
  <AppRoutes />,
  // </React.StrictMode>,
  document.getElementById('root')
)
