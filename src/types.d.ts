export interface HttpResponse<T> {
  status: string
  statusCode: number
  message: string
  data?: T
}
