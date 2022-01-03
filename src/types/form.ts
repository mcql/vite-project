export interface FormArray {
  field: string
  type: string
  label?: string
  rules?: object[]
  style?: string
  className?: string | string[]
  colon?: boolean
  disabled?: boolean
  labelAlign?: string
  optionsProps?: optionsProps
}

export interface optionsProps {
  options?: Array<{ label: string; value: any; disabled?: boolean }>
  placeholder?: string
  direction?: 'horizontal' | 'vertical' | undefined
  action?: string
  limit?: number
  tip?: string
}

export interface formInterface {
  layout?: layoutType
}

export type layoutType = 'vertical' | 'horizontal' | 'inline' | undefined
