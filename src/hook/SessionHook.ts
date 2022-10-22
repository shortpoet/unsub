import { useEffect, useState } from 'react';
// import { useSession } from "next-auth/client";
import { getSession } from '../api/SecurityApi';
import { useHandler } from '@aux4/use-handler';
import { LOGIN, LOGOUT } from '../event/Event';

export function useSession() {
  const [session, setSession] = useState(getSession());

  useEffect(() => {
    const currentSession = getSession();
    if (currentSession) {
      setSession(currentSession);
    }
  }, []);

  useHandler(() => {
    const currentSession = getSession();
    if (currentSession) {
      setSession(currentSession);
    }
  }, [LOGIN, LOGOUT]);

  return session;
}
