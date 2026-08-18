export interface ApiErrorResponse {
  message?: string
  errors?: Record<string, string[]>
}

export interface ApiError {
  message: string | null
  fieldErrors: Record<string, string[]> | null
}
