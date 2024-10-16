export type ResponseTemplateType<DataType> = {
  success: boolean
  message: string
  code: number
  data: DataType
}
