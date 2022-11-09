import { Api } from './Api';
import { IApiConfig } from './IApi';
import { storeCredentials } from './SecurityApi';
import { Session, User, Account, SESSION } from '../@types/Session';

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
  user: User;
  account: Account;
}

export async function validateUser(username: string, password: string) {
  const config: IApiConfig = {
    timeout: 10000
  };
  const accessToken = 'accessToken';
  // const { user: session } = await login(username, password);
  const session = await login(username, password);
  // const { accessToken, refreshToken } = await login(username, password);
  // const { user, account } = await getUser(accessToken);
  // const session = { accessToken, refreshToken, user, account };
  return session;
}
export async function refreshTokens(
  refreshToken: Session['refreshToken']
): Promise<{ accessToken: Session['accessToken'] }> {
  const config: IApiConfig = {
    timeout: 10000
  };
  const accessToken = 'accessToken';
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
): Session | PromiseLike<Session> {
  console.log('login');
  if (!username || !password) {
    return Promise.reject('Username and password are required');
  }
  console.log(username);
  console.log(password);
  const session = SESSION;
  // const api = new AuthApi(config);
  // const { accessToken }: AuthResponse = await api.post(
  //   '/auth/refresh',
  //   { refreshToken },
  //   { headers: { Authorization: `Bearer ${refreshToken}` } },
  //   false
  // );
  storeCredentials(session);
  return session;
}

function getUser(accessToken: any) {
  throw new Error('Function not implemented.');
}
// function login(
//   username: string,
//   password: string
// ):
//   | { accessToken: any; refreshToken: any }
//   | PromiseLike<{ accessToken: any; refreshToken: any }> {
//   throw new Error('Function not implemented.');
// }
