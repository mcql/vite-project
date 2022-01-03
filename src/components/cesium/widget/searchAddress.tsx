import { Input, Cascader, Button, Form } from '@arco-design/web-react'
import { IconSearch } from '@arco-design/web-react/icon'
import { countryCascader } from '../../../services/td'
import { useMount } from 'ahooks'
import { base } from '../../../const/base'
import { useState } from 'react'
import '../index.css'

interface propsInterface {
  // 微件位置
  right?: string
  top?: string
  // 是否显示当前微件
  isShow?: boolean
  // 往父类传表单的值
  getAddress(address: string): void
}

export const searchAddress = (props: propsInterface) => {
  const [cities, setCities] = useState([])
  const [form] = Form.useForm()

  useMount(async () => {
    // 加载国内省市县数据 第一次获取接口 第二次加载缓存
    if (localStorage.getItem('country')) {
      setCities(JSON.parse(localStorage.getItem('country') || '[]'))
    } else {
      let res = await countryCascader({
        tk: base.tdtTk,
        postStr: {
          searchType: 0,
          searchWord: 156000000,
          needAll: true
        }
      })
      localStorage.setItem('country', JSON.stringify(res.data.child))
      setCities(res.data.child)
    }
  })

  const getDetail = () => {
    // 表单项转成需要的string
    let formData = form.getFields()
    let country = formData.country ? formData.country.join('') : ''
    let detail = formData.detail || ''
    props.getAddress(country + detail)
  }

  return props.isShow ? (
    <div
      className="search-widget"
      style={{ top: props.top, right: props.right }}>
      <Form layout="inline" form={form}>
        <Form.Item field="country">
          <Cascader
            options={cities}
            placeholder="请选择城市"
            fieldNames={{
              label: 'name',
              value: 'name',
              children: 'child'
            }}
          />
        </Form.Item>
        <Form.Item field="detail">
          <Input placeholder="请输入地址" style={{ margin: '0 10px' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={getDetail} icon={<IconSearch />}>
            搜索
          </Button>
        </Form.Item>
      </Form>
    </div>
  ) : (
    <div />
  )
}

export default searchAddress
