import { Checkbox } from '@arco-design/web-react'
import { optionsProps } from '@/types/form'

interface checkBoxInterface extends optionsProps {
  changeValue(field: string, value: any): void
  field: string
  value: any
}

const acSelect = (props: checkBoxInterface) => {
  const changeValue = (value: any[]) => {
    props.changeValue(props.field, value)
  }

  return (
    <Checkbox.Group
      value={props.value}
      direction={props.direction}
      options={props.options}
      onChange={changeValue}
    />
  )
}

export default acSelect
