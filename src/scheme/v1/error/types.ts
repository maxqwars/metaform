export interface ApiErrorDto {
  message?: string
  errors?: Record<string, string[]>
}

export interface ApiErrorBody {
  message: string | null
  fieldErrors: Record<string, string[]> | null
}
