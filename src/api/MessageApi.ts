import { Api } from './Api';
import { IApiConfig } from './IApi';

export class MessageApi extends Api {
  constructor(config: IApiConfig) {
    // console.log('MessageApi constructor');
    super(config);
  }
  public async getMessages(params?: any): Promise<any> {
    params = { params: { fetchCount: 10, ...params } };
    try {
      const source = params.source || 'api';
      return await this.get(`/${source}/message/get`, params);
    } catch (error) {
      console.log('MessageApi.getMessages error', error);
      return error;
    }
  }
  public async getDomains(params?: any): Promise<any> {
    params = { params: { fetchCount: 10, ...params } };
    try {
      const source = params.source || 'api';
      return await this.get(`/${source}/message/group`, params);
    } catch (error) {
      console.log('MessageApi.getDomains error', error);
      return error;
    }
  }
}
