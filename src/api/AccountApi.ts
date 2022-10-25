import { Api } from './Api';
import { IApiConfig } from './IApi';

export class AccountApi extends Api {
  constructor(config: IApiConfig) {
    super(config);
  }
  public async getAccounts(params?: any): Promise<any> {
    params = { params: { fetchCount: 0, ...params } };
    try {
      return await this.get('/api/account/get', params);
    } catch (error) {
      console.log('AccountApi.getMessages error', error);
      return error;
    }
  }
}
