import { refreshTokens } from './AuthApi';

export function getSession(): any | undefined {
  const sessionJson = localStorage.getItem('session');
  if (!sessionJson) {
    return undefined;
  }
  try {
    const session = JSON.parse(sessionJson);
    if (!session.user || !session.user.organization) {
      removeCredentials();
      return undefined;
    }
    return session;
  } catch (e) {
    removeCredentials();
    return undefined;
  }
}

export function storeCredentials(session: any) {
  localStorage.setItem('session', JSON.stringify(session));
}

export function removeCredentials() {
  throw new Error('Function not implemented.');
}

export async function refreshSession(session: any) {
  session = session || getSession();
  if (!session) {
    return;
  }
  const { refreshToken } = session;
  const { accessToken } = await refreshTokens(refreshToken);
  const newSession = { ...session, accessToken };
  storeCredentials(newSession);
}
