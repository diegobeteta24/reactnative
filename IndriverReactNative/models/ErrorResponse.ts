export interface ErrorResponse {
  status: number;
  message?: string;
  errors?: Record<string, string[]> | null;
  raw?: any;
}

// named export only
