import { Radio } from '@arco-design/web-react'
import { optionsProps } from '@/types/form'

interface radioInterface extends optionsProps {
  changeValue(field: string, value: any): void
  field: string
}

const acRadio = (props: radioInterface) => {
  const changeValue = (value: string) => {
    props.changeValue(props.field, value)
  }

  return (
    <Radio.Group
      direction={props.direction}
      options={props.options}
      onChange={changeValue}
    />
  )
}

export default acRadio
