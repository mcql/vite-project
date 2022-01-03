import CrudComp from '@/components/crud/crudComp'
import roles from '@/const/roles'
import { layoutType } from '@/types/form'
import { Button, Form, Modal } from '@arco-design/web-react'
import { useRef, useState } from 'react'
import FormComponents from '@/components/form/index'

interface rolesObjType {
  [key: number]: string
}

interface crudInter {
  deleteTable: any
  createTable: any
  updateTable: any
}

interface formInter {
  resetFields: any
  getFields: any
  validate: any
  setFieldsValue: any
}

const user = () => {
  const crudRef = useRef<crudInter>()
  const [title, setTitle] = useState('新增')
  const [visible, setVisible] = useState(false)
  const [row, setRow] = useState()
  let rolesObj: rolesObjType = {}
  for (let item of roles) {
    rolesObj[item.value] = item.label
  }
  let layout: layoutType = 'inline'
  const userFormElement = useRef<formInter>()
  const addUser = () => {
    setTitle('新增')
    setVisible(true)
  }
  const editUser = (row: any) => {
    setTitle('编辑')
    setVisible(true)
    setRow(row)
  }
  const setForm = () => {
    userFormElement.current?.setFieldsValue(row)
  }
  const closeModal = () => {
    userFormElement.current?.resetFields()
    setVisible(false)
  }
  const addSubmit = async () => {
    try {
      await userFormElement.current?.validate()
      if (title === '新增') {
        await crudRef.current?.createTable(userFormElement.current?.getFields())
      } else {
        await crudRef.current?.updateTable(userFormElement.current?.getFields())
      }
      closeModal()
    } catch (_) {
      console.log('验证失败')
    }
  }
  const options = {
    url: '/vite-api/api/user/list',
    hasPagination: true,
    addElement: (
      <Button type="primary" onClick={addUser}>
        新增
      </Button>
    ),
    formParams: {
      layout: layout
    },
    formSearchOption: [
      {
        field: 'username',
        type: 'input',
        label: '用户名'
      }
    ],
    columns: [
      {
        title: '姓名',
        dataIndex: 'username'
      },
      {
        title: '权限',
        dataIndex: 'roles',
        render: (col: any, record: any) => {
          return <span>{rolesObj[record.roles]}</span>
        }
      },
      {
        title: '操作',
        dataIndex: 'id',
        render: (col: any, record: any) => (
          <div>
            {record.roles !== 0 && (
              <div>
                <Button
                  type="text"
                  status="danger"
                  onClick={() => crudRef.current?.deleteTable(record.id)}>
                  删除
                </Button>
                <Button type="text" onClick={() => editUser(record)}>
                  修改
                </Button>
              </div>
            )}
          </div>
        )
      }
    ]
  }

  const userForm = [
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
    },
    {
      field: 'roles',
      type: 'select',
      rules: [
        {
          required: true,
          message: '权限不能为空'
        }
      ],
      optionsProps: {
        options: roles,
        placeholder: '请选择用户权限'
      }
    },
    {
      field: 'icon',
      type: 'upload',
      optionsProps: {
        action: '/vite-api/api/upload',
        limit: 1,
        tip: '头像上传'
      }
    }
  ]

  const ButtonProps = (
    <Form.Item>
      <Button type="primary" className="login-btn" onClick={addSubmit}>
        确定
      </Button>
      <Button className="login-btn" onClick={closeModal}>
        取消
      </Button>
    </Form.Item>
  )

  return (
    <div>
      <CrudComp ref={crudRef} {...options} />
      <Modal
        visible={visible}
        title={title}
        simple={true}
        afterOpen={setForm}
        footer={null}
        onCancel={closeModal}>
        <FormComponents
          formOptions={userForm}
          formButton={ButtonProps}
          ref={userFormElement}
        />
      </Modal>
    </div>
  )
}

export default user
