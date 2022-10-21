import { Api } from './Api';

export class MessageApi extends Api {
  public async getMessages(): Promise<any> {
    return await this.get('/getMessages', { params: { fetchCount: 10 } });
  }
}
