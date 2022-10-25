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
      return await this.get('/gmail-api/get/messages', params);
    } catch (error) {
      console.log('MessageApi.getMessages error', error);
      return error;
    }
  }
  public async getMessagesParsed(params?: any): Promise<any> {
    params = { params: { fetchCount: 10, ...params } };
    try {
      return await this.get('/gmail-api/get/messages/parse', params);
    } catch (error) {
      console.log('MessageApi.getMessagesParsed error', error);
      return error;
    }
  }
}
