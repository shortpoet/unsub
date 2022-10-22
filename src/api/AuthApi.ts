import { Api } from './Api';
import { IApiConfig } from './IApi';
import { storeCredentials } from './SecurityApi';

// export class AuthApi extends Api {
//   constructor(config: IApiConfig) {
//     // console.log('AuthApi constructor');
//     super(config);
//   }
//   public async getMessages(): Promise<any> {
//     return await this.get('/getMessages', { params: { fetchCount: 10 } });
//   }
// }

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: any;
}

export async function validateUser(username: string, password: string) {
  const { accessToken, refreshToken } = await login(username, password);
  const user = await getUser(accessToken);
  const session = { accessToken, refreshToken, user };
  storeCredentials(session);
  return session;
}

export async function refreshTokens(refreshToken: any) {
  const config: IApiConfig = {
    baseURL: 'http://localhost:3000',
    timeout: 10000
  };
  const accessToken = { accessToken: 'accessToken' };
  // const api = new AuthApi(config);
  // const { accessToken }: AuthResponse = await api.post(
  //   '/auth/refresh',
  //   { refreshToken },
  //   { headers: { Authorization: `Bearer ${refreshToken}` } },
  //   false
  // );
  return { accessToken };
}

function login(
  username: string,
  password: string
):
  | { accessToken: any; refreshToken: any }
  | PromiseLike<{ accessToken: any; refreshToken: any }> {
  throw new Error('Function not implemented.');
}
function getUser(accessToken: any) {
  throw new Error('Function not implemented.');
}
