import { storeCredentials } from './SecurityApi';

export async function validateUser(username: string, password: string) {
  const { accessToken, refreshToken } = await login(username, password);
  const user = await getUser(accessToken);
  const session = { accessToken, refreshToken, user };
  storeCredentials(session);
  return session;
}

export async function refreshTokens(refreshToken: any) {
  const api = new AuthApi();
  const { accessToken } = await api.post(
    '/auth/refresh',
    { refreshToken },
    { headers: { Authorization: `Bearer ${refreshToken}` } },
    false
  );
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
