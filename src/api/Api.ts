import axios, { AxiosError } from 'axios';
import { logout } from '../event/Action';
import { IApi, IApiConfig, IApiError } from './IApi';
import { getSession, refreshSession } from './SecurityApi';

const API_URL = process.env.REACT_APP_API || 'http://localhost:3000/api';
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
    data?: any,
    options?: any,
    forceRefresh = false,
    retry = true
  ): Promise<T> {
    console.log('Api.callApi', method, url, data, options, forceRefresh, retry);
    console.log({
      method: method,
      url: url,
      data: data,
      options: options,
      forceRefresh: forceRefresh,
      retry: retry
    });
    const headers = {};
    // let session = getSession();
    // if (!session) {
    //   logout();
    //   // throw new Error('No session');
    // }
    // const config = session
    //   ? {
    //       headers: {
    //         Authorization: `Bearer ${session.token}`,
    //         'Content-Type': 'application/json'
    //       }
    //     }
    //   : {
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     };
    // const accessToken = session?.accessToken;
    // const headers = accessToken
    //   ? { Authorization: `Bearer ${accessToken}` }
    //   : undefined;
    try {
      // if (forceRefresh) {
      //   session = await refreshSession(session);
      //   config.headers.Authorization = `Bearer ${session.token}`;
      // }
      // const response = await axios.request<T>({
      //   method,
      //   url: this.config.baseURL + url,
      //   data,
      //   ...config,
      //   ...options
      // });
      const response = await axios({
        method: method,
        url: `${API_URL}${url}`,
        data: data,
        headers: headers,
        params: options
      });
      console.log('Api.callApi response', response);

      return response.data as T;
    } catch (e: any) {
      console.error('[Api] Error: ', e.response, e);
      if (e.response?.status === 401 || e.response?.status === 403) {
        if (forceRefresh === undefined || forceRefresh === null) {
          return this.callApi<T>(method, url, data, true, retry);
        } else if (retry) {
          return this.callApi<T>(method, url, data, false, false);
        } else {
          logout();
        }
        // if (retry) {
        //   const refreshedSession = await refreshSession();
        //   if (refreshedSession) {
        //     return this.callApi<T>(method, url, data, false);
        //   }
        // } else {
        //   logout();
        // }
        // await refreshSession();
        // return this.callApi<T>(method, url, data);
      }
      // throw new Error(e.response && e.response.data ? e.response.data.message : e.message);
      throw e;
    }
  }

  public get<T>(
    url: string,
    options?: any,
    forceRefresh?: boolean | undefined,
    retry?: boolean | undefined
  ) {
    try {
      return this.callApi<T>(
        'GET',
        url,
        undefined,
        options,
        forceRefresh,
        retry
      );
    } catch (error) {
      console.log('Api.get error', error);
    }
  }

  public post<T>(
    url: string,
    data?: any,
    options?: any,
    forceRefresh?: boolean | undefined,
    retry?: boolean | undefined
  ) {
    return this.callApi<T>('POST', url, data, options, forceRefresh, retry);
  }

  public put<T>(
    url: string,
    data?: any,
    options?: any,
    forceRefresh?: boolean | undefined,
    retry?: boolean | undefined
  ) {
    return this.callApi<T>('PUT', url, data, options, forceRefresh, retry);
  }

  public delete<T>(
    url: string,
    data?: any,
    options?: any,
    forceRefresh?: boolean | undefined,
    retry?: boolean | undefined
  ) {
    return this.callApi<T>('DELETE', url, data, options, forceRefresh, retry);
  }
}
