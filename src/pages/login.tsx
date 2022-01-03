import {
  useEffect,
  useRef
  // useState
} from 'react'
import FormComponents from '@/components/form/index'
import {
  // AppID,
  loginForm
  // redirectUri
} from '@/const/login'
import {
  Form,
  Button,
  Message
  // Switch
} from '@arco-design/web-react'
import { loginApi } from '@/services/login'
import { useNavigate } from 'react-router-dom'
// import { useMount } from 'ahooks'
import './login.css'

interface formInter {
  form: any
}

const login = () => {
  // 定义ref 获取子组件的属性及方法
  const loginFormElement = useRef<formInter>()
  const navigate = useNavigate()

  // const [type, setType] = useState('pc')
  const type = 'pc'

  useEffect(() => {
    localStorage.getItem('bearer') && navigate('/')
  }, [])

  // useMount(() => {
  //   window.WxLogin({
  //     self_redirect: false,
  //     id: 'wxLogin',
  //     appid: AppID,
  //     scope: 'snsapi_login',
  //     redirect_uri: redirectUri,
  //     state: Math.ceil(Math.random() * 1000),
  //     style: 'black',
  //     href: ''
  //   })
  // })

  const submit = async () => {
    try {
      // 拿到子组件的方法做校验及提交
      await loginFormElement.current?.form.validate()
      let res = await loginApi(loginFormElement.current?.form.getFields())
      if (res.code === 0) {
        localStorage.setItem('bearer', res.payload.token)
        Message.success(res.msg)
        navigate('/')
      } else {
        Message.error(res.msg)
      }
      console.log(res)
      // console.log(loginFormElement.current?.form.getFields())
    } catch (_) {
      console.log('验证失败')
    }
  }

  // 插槽 通过props将dom传到子组件
  const ButtonProps = (
    <Form.Item wrapperCol={{ span: 24 }}>
      <Button type="outline" className="login-btn" onClick={submit} long={true}>
        登录
      </Button>
    </Form.Item>
  )

  // const changeType = (value: boolean) => {
  //   setType(value ? 'wx' : 'pc')
  // }

  return (
    <section className="login">
      <div className="login-form">
        <h1>
          登录
          {/*  <Switch*/}
          {/*    onChange={changeType}*/}
          {/*    checkedText="pc"*/}
          {/*    uncheckedText="微信"*/}
          {/*    defaultChecked*/}
          {/*  />*/}
        </h1>
        {/*<div*/}
        {/*  style={{ display: type === 'wx' ? 'block' : 'none' }}*/}
        {/*  id="wxLogin"*/}
        {/*/>*/}
        <div style={{ display: type === 'pc' ? 'block' : 'none' }}>
          <FormComponents
            formOptions={loginForm}
            formButton={ButtonProps}
            ref={loginFormElement}
          />
        </div>
      </div>
    </section>
  )
}

export default login
