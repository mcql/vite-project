import './index.css'
import logo from '@/favicon.svg'
import { Avatar } from '@arco-design/web-react'

const HeaderComponent = () => {
  return (
    <div className="header">
      <div className="header-left">
        <img src={logo} alt="" />
        <h5>Vite App</h5>
      </div>
      <div className="header-right">
        <Avatar>M</Avatar>
      </div>
    </div>
  )
}

export default HeaderComponent
