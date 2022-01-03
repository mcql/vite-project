import {
  forwardRef,
  ReactElement,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import FormComponents from '@/components/form/index'
import { Button, Form, Message } from '@arco-design/web-react'
import services from '@/services'
import { Table, Pagination } from '@arco-design/web-react'
import { mb } from '@/utils'
import { formInterface } from '@/types/form'

interface rolesObjType {
  [key: number]: string | number
  id?: number
}

interface crudInterface {
  url: string
  columns: tableColumnsInterface[]
  page?: number
  size?: number
  dataText?: string
  totalText?: string
  hasPagination?: boolean
  hasDelete?: boolean
  hasShow?: boolean
  hasOperate?: boolean
  extraQuery?: {}
  formSearchOption?: any[]
  formParams?: formInterface
  addElement?: ReactElement
}

// 表头数据格式
interface tableColumnsInterface {
  title: string
  dataIndex: string
  render?: (col: any, item: any, index: number) => any
}

interface formInter {
  form: any
}

const crudComp = (props: crudInterface, ref: any) => {
  // 通过ref 将子组件的form所有内容暴露到父组件
  useImperativeHandle(ref, () => ({ deleteTable, createTable, updateTable }))

  const searchFormEle = useRef<formInter>()

  // 分页
  const [page, setPage] = useState(props.page || 1)
  const [size, setSize] = useState(props.size || 10)
  // 头部搜索属性
  const [formData, setFormData] = useState({})
  // 表格数据
  const [tableData, setTableData] = useState([])
  // 表格总数
  const [tableTotal, setTableTotal] = useState(0)

  // 表格list接口
  const url = props.url
  // 接口返回表格数据标识
  const dataText = props.dataText || 'payload.content'
  // 接口返回表格总数标识
  const totalText = props.totalText || 'payload.total'
  // 是否有分页
  const hasPagination = props.hasPagination
  // 是否有操作栏
  const hasOperate = props.hasOperate
  // 是否展示表格操作单行查看
  let hasShow = props.hasShow
  // 是否展示表格操作单行删除
  let hasDelete = props.hasDelete
  // 表头
  let columns = [...props.columns]
  // 头部操作
  const addElement = props.addElement
  // 默认rd操作
  if (hasOperate) {
    columns.push({
      title: '操作',
      dataIndex: 'id',
      render: (col: any, record: any) => (
        <div>
          {hasShow && <Button type="text">查看</Button>}
          {hasDelete && (
            <Button
              type="text"
              status="danger"
              onClick={() => deleteTable(record.id)}>
              删除
            </Button>
          )}
        </div>
      )
    })
  }
  // 获取表格数据额外参数
  const extraQuery = props.extraQuery
  // 头部搜索字段
  const formSearchOption = props.formSearchOption

  const formParams = props.formParams

  // 默认crud操作逻辑
  const createTable = (row: rolesObjType) => {
    services.post(`${url}`, { ...row }).then((res: any) => {
      if (res.code === 0) {
        Message.success('新增成功')
        readTable()
      } else {
        Message.error(res.msg)
      }
    })
  }
  const readTable = () => {
    services
      .get(url, {
        params: {
          page: page,
          size: size,
          ...extraQuery,
          ...formData
        }
      })
      .then((res: any) => {
        setTableData(mb(dataText.split('.'))(res))
        setTableTotal(mb(totalText.split('.'))(res))
      })
  }
  const updateTable = (row: rolesObjType) => {
    services.put(`${url}/${row.id}`, { ...row }).then((res: any) => {
      if (res.code === 0) {
        Message.success(res.msg)
        readTable()
      } else {
        Message.error(res.msg)
      }
    })
  }
  const deleteTable = (id: number) => {
    services.delete(`${url}/${id}`).then(() => {
      Message.success('删除成功')
      readTable()
    })
  }

  // 分页及搜索重新请求list的get接口
  useEffect(() => {
    readTable()
    return () => {
      searchFormEle.current = undefined
    }
  }, [page, size, formData])

  // 分页操作
  const changePagination = (pageNumber: number, pageSize: number) => {
    setPage(pageNumber)
    setSize(pageSize)
  }

  // 获取搜索表单值
  const getFormData = () => {
    setFormData(searchFormEle.current?.form.getFields())
  }
  const resetSearch = () => {
    searchFormEle.current?.form.resetFields()
    setFormData(searchFormEle.current?.form.getFields())
  }

  const ButtonProps = (
    <Form.Item>
      <Button onClick={getFormData} type="primary">
        搜索
      </Button>
      <Button onClick={resetSearch}>重置</Button>
    </Form.Item>
  )

  // 表格主体
  const acTable = (
    <div>
      <Table
        rowKey="id"
        style={{ marginTop: '20px' }}
        columns={columns}
        data={tableData}
        pagination={false}
      />
      {hasPagination && (
        <Pagination
          style={{ marginTop: '20px' }}
          sizeCanChange
          showTotal
          showJumper
          total={tableTotal}
          onChange={changePagination}
        />
      )}
    </div>
  )

  // 搜索栏
  const form = formSearchOption && (
    <FormComponents
      formOptions={formSearchOption}
      formButton={ButtonProps}
      form={formParams}
      ref={searchFormEle}
    />
  )

  return (
    <div ref={ref}>
      {formSearchOption && form}
      <div style={{ margin: '20px 0' }}>{addElement}</div>
      {acTable}
    </div>
  )
}

export default forwardRef(crudComp)
