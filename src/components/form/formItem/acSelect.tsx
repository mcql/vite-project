import { Select } from '@arco-design/web-react'
import { optionsProps } from '@/types/form'

const acSelect = (props: optionsProps) => {
  return (
    <Select {...props}>
      {props.options &&
        props.options.map((item, index) => {
          return (
            <Select.Option
              key={index}
              disabled={item.disabled}
              value={item.value}>
              {item.label}
            </Select.Option>
          )
        })}
    </Select>
  )
}

export default acSelect
