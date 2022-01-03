export interface routesInterface {
  label: string
  value: string
  path: string
  file: string
  isShow?: boolean
  children?: routesInterface[]
}
