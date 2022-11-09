import { Session } from '../@types/Session';
import { refreshTokens } from './AuthApi';

export function getSession(): Session | undefined {
  const sessionJson = localStorage.getItem('session');
  if (!sessionJson) {
    return undefined;
  }
  try {
    const session = JSON.parse(sessionJson);
    if (!session.user || !session.account) {
      removeCredentials();
      return undefined;
    }
    return session;
  } catch (e) {
    removeCredentials();
    return undefined;
  }
}

export function storeCredentials(session: Session) {
  localStorage.setItem('session', JSON.stringify(session));
}

export function removeCredentials() {
  console.log('b4 removeCredentials');
  console.log(localStorage.getItem('session'));
  console.log('removeCredentials');
  localStorage.removeItem('session');
  console.log(localStorage.getItem('session'));
}

export async function refreshSession(
  session?: Session | undefined
): Promise<Session | undefined> {
  session = session || getSession();
  if (!session) {
    return;
  }
  const { refreshToken } = session;
  const { accessToken } = await refreshTokens(refreshToken);
  const newSession = { ...session, accessToken };
  storeCredentials(newSession);
  return newSession;
}
