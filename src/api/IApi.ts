export interface IApi {
  get: (
    url: string,
    options?: any | undefined,
    retry?: number | undefined,
    forceRefresh?: boolean | undefined
  ) => Promise<any> | undefined;
  post: (
    url: string,
    data?: any | undefined,
    options?: any | undefined,
    retry?: number | undefined,
    forceRefresh?: boolean | undefined
  ) => Promise<any>;
  put: (
    url: string,
    data?: any | undefined,
    options?: any | undefined,
    retry?: number | undefined,
    forceRefresh?: boolean | undefined
  ) => Promise<any>;
  delete: (
    url: string,
    data?: any | undefined,
    options?: any | undefined,
    retry?: number | undefined,
    forceRefresh?: boolean | undefined
  ) => Promise<any>;
}

export interface IApiConfig {
  baseURL: string;
  timeout: number;
}

export interface IApiError {
  error: { error: string; error_description: string };
  status: number;
}
