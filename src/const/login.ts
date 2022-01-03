import { FormArray } from '@/types/form'

const loginForm: FormArray[] = [
  {
    field: 'username',
    type: 'input',
    rules: [
      {
        required: true,
        message: '用户名不能为空'
      }
    ],
    optionsProps: {
      placeholder: '请输入用户名'
    }
  },
  {
    field: 'password',
    type: 'password',
    rules: [
      {
        required: true,
        message: '密码不能为空'
      }
    ],
    optionsProps: {
      placeholder: '请输入密码'
    }
  }
]

const AppID = 'wx1f63b3c878e07cb8'

const redirectUri = ''

export { loginForm, AppID, redirectUri }
