import { GmailMessageDTO } from '../types/messageDTO';
import { Api } from './Api';
import { IApiConfig } from './IApi';

export type PuppeteerParams = {
  gmailIds: GmailMessageDTO['gmailId'][];
  elementType?: string | undefined;
};

export class PuppeteerApi extends Api {
  constructor(config: IApiConfig) {
    super(config);
  }
  public async run(params?: PuppeteerParams): Promise<any> {
    try {
      return await this.post('/internal/puppeteer/run', params);
    } catch (error) {
      console.log('PuppeteerApi.run error', error);
      return error;
    }
  }
  public async getElements(params?: PuppeteerParams): Promise<any> {
    try {
      console.log('PuppeteerApi.getElements params', params);
      return await this.post('/internal/puppeteer/elements', params);
    } catch (error) {
      console.log('PuppeteerApi.getElements error', error);
      return error;
    }
  }
}
