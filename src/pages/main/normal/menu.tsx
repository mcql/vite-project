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
  tableData: any
}

interface formInter {
  resetFields: any
  getFields: any
  validate: any
  setFieldsValue: any
}

const menu = () => {
  const [title, setTitle] = useState('新增')
  const [visible, setVisible] = useState(false)
  const [row, setRow] = useState()
  const crudRef = useRef<crudInter>()
  let rolesObj: rolesObjType = {}
  for (let item of roles) {
    rolesObj[item.value] = item.label
  }
  let layout: layoutType = 'inline'
  const menuFormElement = useRef<formInter>()
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
    menuFormElement.current?.setFieldsValue(row)
  }
  const closeModal = () => {
    menuFormElement.current?.resetFields()
    setRow(undefined)
    setVisible(false)
  }
  const addSubmit = async () => {
    try {
      await menuFormElement.current?.validate()
      if (title === '新增') {
        await crudRef.current?.createTable(menuFormElement.current?.getFields())
      } else {
        await crudRef.current?.updateTable(menuFormElement.current?.getFields())
      }
      closeModal()
    } catch (_) {
      console.log('验证失败')
    }
  }
  const options = {
    url: '/vite-api/api/menu/list',
    hasPagination: false,
    page: 1,
    size: 999,
    addElement: (
      <Button type="primary" onClick={addUser}>
        新增
      </Button>
    ),
    formParams: {
      layout: layout
    },
    columns: [
      {
        title: '标题',
        dataIndex: 'title',
        width: '300px'
      },
      {
        title: '标识',
        dataIndex: 'value',
        width: '200px'
      },
      {
        title: '文件路径',
        dataIndex: 'file',
        width: '220px'
      },
      {
        title: '路径',
        dataIndex: 'path',
        width: '220px'
      },
      {
        title: '图标',
        dataIndex: 'icon',
        width: '220px',
        render: (col: any, record: any) => <div>{record.icon || '-'}</div>
      },
      {
        title: '操作',
        dataIndex: 'id',
        render: (col: any, record: any) =>
          record.id !== 0 && (
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

  const menuForm = [
    {
      field: 'pid',
      type: 'cascader',
      rules: [
        {
          required: true,
          message: '父级不能为空'
        }
      ],
      optionsProps: {
        options: crudRef.current?.tableData,
        placeholder: '请选择父级',
        changeOnSelect: true,
        fieldNames: {
          label: 'title',
          value: 'id'
        }
      }
    },
    {
      field: 'title',
      type: 'input',
      rules: [
        {
          required: true,
          message: '标题不能为空'
        }
      ],
      optionsProps: {
        placeholder: '请输入标题'
      }
    },
    {
      field: 'value',
      type: 'input',
      rules: [
        {
          required: true,
          message: '标识不能为空'
        }
      ],
      optionsProps: {
        placeholder: '请输入标识'
      }
    },
    {
      field: 'icon',
      type: 'input',
      optionsProps: {
        placeholder: '请输入图标'
      }
    },
    {
      field: 'path',
      type: 'input',
      rules: [
        {
          required: true,
          message: '跳转路径不能为空'
        }
      ],
      optionsProps: {
        placeholder: '请输入跳转路径'
      }
    },
    {
      field: 'file',
      type: 'input',
      rules: [
        {
          required: true,
          message: '文件路径不能为空'
        }
      ],
      optionsProps: {
        placeholder: '请输入文件路径'
      }
    },
    {
      field: 'show',
      type: 'radio',
      optionsProps: {
        options: [
          {
            label: '是',
            value: true
          },
          {
            label: '否',
            value: false
          }
        ]
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
          formOptions={menuForm}
          formButton={ButtonProps}
          ref={menuFormElement}
        />
      </Modal>
    </div>
  )
}

export default menu
