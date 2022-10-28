import { GmailMessageDTO } from '../types/messageDTO';
import { Api } from './Api';
import { IApiConfig } from './IApi';

export class PuppeteerApi extends Api {
  constructor(config: IApiConfig) {
    super(config);
  }
  public async run(params?: {
    gmailIds: GmailMessageDTO['gmailId'][];
  }): Promise<any> {
    try {
      return await this.post('/internal/puppeteer/run', params);
    } catch (error) {
      console.log('PuppeteerApi.run error', error);
      return error;
    }
  }
}
