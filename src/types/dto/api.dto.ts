 export interface BaseApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
  }