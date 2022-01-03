import React, { ReactElement, useImperativeHandle, forwardRef } from 'react'
import { Form } from '@arco-design/web-react'
import { FormArray, formInterface } from '@/types/form'
import AcInput from './formItem/acInput'
import AcInputPassword from './formItem/acInputPassword'
import AcSelect from './formItem/acSelect'
import AcRadio from './formItem/acRadio'
import AcCheckbox from './formItem/acCheckbox'
import AcUpload from '@/components/form/formItem/acUpload'

interface formProps {
  formOptions: FormArray[]
  formButton: ReactElement
  form?: formInterface
}

const FormComponents = (props: formProps, ref: any) => {
  const [form] = Form.useForm()

  // 通过ref 将子组件的form所有内容暴露到父组件
  useImperativeHandle(ref, () => ({ form }))

  const changeValue = (field: string, value: any) => {
    form.setFieldValue(field, value)
  }

  // 根据type动态渲染表单项
  const Ele = (type: string, options: any, field: string) => {
    let dom: ReactElement
    switch (type) {
      case 'input':
        dom = <AcInput {...options} />
        break
      case 'password':
        dom = <AcInputPassword {...options} />
        break
      case 'select':
        dom = <AcSelect {...options} />
        break
      case 'radio':
        dom = <AcRadio {...options} field={field} changeValue={changeValue} />
        break
      case 'checkbox':
        dom = (
          <AcCheckbox {...options} field={field} changeValue={changeValue} />
        )
        break
      case 'upload':
        dom = <AcUpload {...options} field={field} changeValue={changeValue} />
        break
      default:
        dom = <div>没有该类型组件</div>
    }
    return dom
  }

  const Dom = props.formOptions.map(item => (
    <Form.Item
      key={item.field}
      label={item.label}
      field={item.field}
      rules={item.rules}>
      {Ele(item.type, item.optionsProps || {}, item.field)}
    </Form.Item>
  ))
  return (
    <Form
      ref={ref}
      form={form}
      layout={props.form?.layout || 'vertical'}
      style={{ maxWidth: 1200 }}>
      {Dom}
      {props.formButton}
    </Form>
  )
}

export default forwardRef(FormComponents)
