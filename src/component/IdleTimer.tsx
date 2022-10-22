import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useIdleTimer } from 'react-idle-timer';
import { useSnackbar } from 'notistack';

import { useSession } from '../hook/SessionHook';
import { refreshSession } from '../api/SecurityApi';
import { logout, displayMessage } from '../event/Action';

const SnackbarButton = styled(Button)`
  && {
    color: #fff;
  }
`;

function SnackbarAction({ snackbarKey, setActivity }: any) {
  const session = useSession();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClickButton = () => {
    if (session) setActivity(true);
    closeSnackbar(snackbarKey);
  };

  return (
    <SnackbarButton variant="text" onClick={handleClickButton}>
      {session ? "I'm back" : 'Dismiss'}
    </SnackbarButton>
  );
}

export function IdleTimer() {
  const session = useSession();
  const [activity, setActivity] = useState(false);

  const onPrompt = () => {
    displayMessage({
      text: 'You have been idle for a while. Please click "I\'m back" to continue.',
      action: (snackbarKey: any) => (
        <SnackbarAction snackbarKey={snackbarKey} setActivity={setActivity} />
      ),
      persist: true,
      preventDuplicate: true
    });

    const onActive = async () => {
      try {
        await refreshSession(session);
      } catch (error) {
        logout();
      }
    };

    const onIdle = () => {
      if (session) {
        logout();
      }
    };

    const { getRemainingTime, getLastActiveTime, reset, activate } =
      useIdleTimer({
        onPrompt: () => onPrompt(),
        onActive: () => onActive(),
        onIdle: () => onIdle(),
        timeout: 1000 * 60 * 25,
        promptTimeout: 1000 * 60,
        debounce: 500
      });

    useEffect(() => {
      if (activity) {
        activate();
        setActivity(false);
      }
    }, [activity, activate]);
  };
  return <>{/* IdleTimer Active */}</>;
}
