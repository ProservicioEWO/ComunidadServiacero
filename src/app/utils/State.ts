export interface State<T> {
  loading: boolean
  data: T | null
  error: string | null
}