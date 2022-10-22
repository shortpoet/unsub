import { Api } from './Api';
import { IApiConfig } from './IApi';

export class MessageApi extends Api {
  constructor(config: IApiConfig) {
    // console.log('MessageApi constructor');
    super(config);
  }
  public async getMessages(): Promise<any> {
    try {
      return await this.get('/getMessages', { params: { fetchCount: 10 } });
    } catch (error) {
      console.log('MessageApi.getMessages error', error);
    }
  }
}
