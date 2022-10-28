import axios, { AxiosError } from 'axios';
import { logout } from '../event/Action';
import { colorLog } from '../util/colorLog';
import { IApi, IApiConfig, IApiError } from './IApi';
import { getSession, refreshSession } from './SecurityApi';

const PORT = process.env.PORT || 3000;
const API_URL =
  `http://${process.env.REACT_APP_API}:${PORT}` || `http://localhost:${PORT}`;
// const API_URL = process.env.REACT_APP_API || 'http://localhost:8888';

export class Api implements IApi {
  private config: IApiConfig;

  constructor(config: IApiConfig) {
    this.config = config;
    this.config.baseURL = config.baseURL || API_URL;
    this.config.timeout = config.timeout || 10000;
  }

  private async callApi<T>(
    method: string,
    url: string,
    data?: any | undefined,
    options?: any | undefined,
    retry = 1,
    forceRefresh?: boolean | undefined
  ): Promise<{ data: T }> {
    // console.log('Api.callApi', method, url, data, options, retry, forceRefresh);
    // console.log({
    //   method: method,
    //   url: url,
    //   data: data,
    //   options: options,
    //   retry: retry,
    //   forceRefresh: forceRefresh
    // });
    // const headers = {};

    let session = getSession();
    if (!session) {
      logout();
      // throw new Error('No session');
    }
    const config = session
      ? {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      : {
          headers: {
            'Content-Type': 'application/json'
          }
        };
    const accessToken = session?.accessToken;
    const headers = accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : undefined;
    try {
      if (forceRefresh) {
        session = await refreshSession(session);
        config.headers.Authorization = `Bearer ${session?.accessToken}`;
      }

      // axios.interceptors.request.use(
      //   function (config) {
      //     console.log('intercept before');
      //     config.validateStatus = function (status) {
      //       return status < 500; // Reject only if the status code is greater than or equal to 500
      //     };
      //     return config;
      //   },
      //   function (error) {
      //     console.log('intercept after');
      //     // Do something with request error
      //     console.log(error);
      //     return Promise.reject(error);
      //   }
      // );

      const response = await axios.request<T>({
        method: method,
        url: `${API_URL}${url}`,
        data: data,
        headers: headers,
        params: options
      });
      // const response = await axios({
      //   method: method,
      //   url: `${API_URL}${url}`,
      //   data: data,
      //   headers: headers,
      //   params: options
      // });
      if (response.status >= 500) {
        // defaults to 0
        colorLog('Axios NOT OK', new Number().valueOf());
        return { data: response.data as T };
      }

      // console.log('Api.callApi response', response);

      return { data: response.data as T };
    } catch (e: any) {
      console.error('[Api] Error: ', e.message);
      // console.error('[Api] Error: ', e.response, e);
      if (e.response?.status === 401 || e.response?.status === 403) {
        // Unauthorized
        const error: IApiError = e.response.data;
        const message = error.error;
        const status = error.status;
        return Promise.reject(error);
        // if (forceRefresh === undefined || forceRefresh === null) {
        //   return this.callApi<T>(
        //     method = method,
        //     url = url,
        //     data = data,
        //     options = options,
        //     retry = retry,
        //     forceRefresh = true
        //   );
        // } else if (retry > 0) {
        //   return this.callApi<T>(method, url, data, false, (retry -= 1));
        // } else {
        //   logout();
        // }
        // await refreshSession();
        // return this.callApi<T>(method, url, data);
      }
      if (retry > 0) {
        const refreshedSession = await refreshSession();
        if (refreshedSession) {
          return this.callApi<T>(
            method,
            url,
            data,
            options,
            (retry -= 1),
            true
          );
        }
      } else {
        console.log('Api.callApi error', e);
        // logout();
      }
      // throw new Error(e.response && e.response.data ? e.response.data.message : e.message);
      return Promise.reject(e.message);
      // return Promise.reject(
      //   e.response && e.response.data ? e.response.data.message : e.message
      // );
      throw e;
    }
  }

  public get<T>(
    url: string,
    options?: any,
    retry?: number | undefined,
    forceRefresh?: boolean | undefined
  ) {
    try {
      return this.callApi<T>(
        'GET',
        url,
        undefined,
        options,
        retry,
        forceRefresh
      );
    } catch (error) {
      console.log('Api.get error', error);
    }
  }

  public post<T>(
    url: string,
    data?: any,
    options?: any,
    retry?: number | undefined,
    forceRefresh?: boolean | undefined
  ) {
    return this.callApi<T>('POST', url, data, options, retry, forceRefresh);
  }

  public put<T>(
    url: string,
    data?: any,
    options?: any,
    retry?: number | undefined,
    forceRefresh?: boolean | undefined
  ) {
    return this.callApi<T>('PUT', url, data, options, retry, forceRefresh);
  }

  public delete<T>(
    url: string,
    data?: any,
    options?: any,
    retry?: number | undefined,
    forceRefresh?: boolean | undefined
  ) {
    return this.callApi<T>('DELETE', url, data, options, retry, forceRefresh);
  }
}
