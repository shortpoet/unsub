export interface IApi {
  get: (
    url: string,
    options?: any | undefined,
    forceRefresh?: boolean | undefined,
    retry?: boolean | undefined
  ) => Promise<any>;
  post: (
    url: string,
    data?: any | undefined,
    options?: any | undefined,
    forceRefresh?: boolean | undefined,
    retry?: boolean | undefined
  ) => Promise<any>;
  put: (
    url: string,
    data?: any | undefined,
    options?: any | undefined,
    forceRefresh?: boolean | undefined,
    retry?: boolean | undefined
  ) => Promise<any>;
  delete: (
    url: string,
    data?: any | undefined,
    options?: any | undefined,
    forceRefresh?: boolean | undefined,
    retry?: boolean | undefined
  ) => Promise<any>;
}

export interface IApiConfig {
  baseURL: string;
  timeout: number;
}

export interface IApiError {
  message: string;
  status: number;
}
