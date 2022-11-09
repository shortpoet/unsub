import { useSession } from './SessionHook';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useCheckAuthentication() {
  const session = useSession();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session && location.pathname !== '/login') {
      navigate('/login');
      // navigate('/login', { state: { from: location } });
    }
  }, [session, location.pathname]);
  // }, [session, location.pathname, navigate]);
}
