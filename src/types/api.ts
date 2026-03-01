export interface ApiError {
  status: number;
  message: string;
  code?: string;
}

export interface QueryConfig {
  enabled?: boolean;
  staleTime?: number;
  retry?: number;
}
