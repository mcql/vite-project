import { useRef } from 'react'
import FormComponents from '@/components/form/index'
import { boardForm } from '@/const/board'
import { Form, Button } from '@arco-design/web-react'
import './index.css'

interface formInter {
  form: any
}

const form = () => {
  // 定义ref 获取子组件的属性及方法
  const boardFormElement = useRef<formInter>()

  const submit = async () => {
    try {
      // 拿到子组件的方法做校验及提交
      await boardFormElement.current?.form.validate()
      console.log(boardFormElement.current?.form.getFields())
    } catch (_) {
      console.log('验证失败')
    }
  }

  // 插槽 通过props将dom传到子组件
  const ButtonProps = (
    <Form.Item wrapperCol={{ span: 24 }}>
      <Button type="primary" onClick={submit} long={true}>
        提交
      </Button>
    </Form.Item>
  )

  return (
    <section className="form">
      <FormComponents
        formOptions={boardForm}
        formButton={ButtonProps}
        ref={boardFormElement}
      />
    </section>
  )
}

export default form
