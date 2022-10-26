import { Api } from './Api';
import { IApiConfig } from './IApi';

export class MessageApi extends Api {
  constructor(config: IApiConfig) {
    // console.log('MessageApi constructor');
    super(config);
  }
  public async getMessages(params?: any): Promise<any> {
    params = { fetchCount: 10, ...params };
    try {
      if (params.source) {
        return await this.get(`/api/${params.source}/message/get`, params);
      }
      return await this.get(`/api/message/get`, params);
    } catch (error) {
      console.log('MessageApi.getMessages error', error);
      return error;
    }
  }
  public async getDomains(params?: any): Promise<any> {
    params = { fetchCount: 10, ...params };
    try {
      console.log('MessageApi.getDomains params', params);
      console.log('source', params.source);
      if (params.source) {
        return await this.get(`/api/${params.source}/message/group`, params);
      }
      return await this.get(`/api/message/group`, params);
    } catch (error) {
      console.log('MessageApi.getDomains error', error);
      return error;
    }
  }
}
