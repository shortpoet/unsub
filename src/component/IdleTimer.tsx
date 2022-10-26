import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { useIdleTimer } from 'react-idle-timer';
import { useSnackbar } from 'notistack';

import { useSession } from '../hook/SessionHook';
import { refreshSession } from '../api/SecurityApi';
import { logout, displaySnackbarMessage, closeSidebar } from '../event/Action';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const SnackbarButton = styled(Button)`
  && {
    color: red;
  }
`;

function SnackbarAction({ snackbarKey, setActivity }: any) {
  const session = useSession();
  const { closeSnackbar } = useSnackbar();

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

const FooterBar = styled.footer`
  background-color: #f5f5f5;
  border-top: 1px solid #e5e5e5;
  bottom: 3rem;
  left: 0;
  padding: 1rem;
  position: fixed;
  right: 0;
  text-align: center;
`;

const AUTHOR = 'Carlos Soriano';
const ORG = 'Shortpoet';

export function IdleTimer() {
  const timeout = 1000 * 60 * 60 * 0.5;
  const promptTimeout = 1000 * 60 * 60 * 0.35;

  const [remaining, setRemaining] = useState(timeout);
  const [elapsed, setElapsed] = useState(0);
  const [lastActive, setLastActive] = useState(+new Date());
  const [isIdle, setIsIdle] = useState(false);
  const navigate = useNavigate();

  const handleOnActive = () => setIsIdle(false);
  const handleOnIdle = () => setIsIdle(true);

  const {
    reset,
    pause,
    resume,
    getRemainingTime,
    getLastActiveTime,
    getElapsedTime
  } = useIdleTimer({
    timeout,
    onActive: handleOnActive,
    onIdle: handleOnIdle
  });

  const handleReset = () => reset();
  const handlePause = () => pause();
  const handleResume = () => resume();

  useEffect(() => {
    setRemaining(getRemainingTime());
    // setLastActive(getLastActiveTime());
    setElapsed(getElapsedTime());

    setInterval(() => {
      setRemaining(getRemainingTime());
      // setLastActive(getLastActiveTime());
      setElapsed(getElapsedTime());
    }, 1000);
  }, []);

  const session = useSession();
  const [activity, setActivity] = useState(false);

  const onPrompt = () => {
    displaySnackbarMessage({
      text: 'You have been idle for a while. Please click "I\'m back" to continue.',
      action: (snackbarKey: any) => (
        <SnackbarAction snackbarKey={snackbarKey} setActivity={setActivity} />
      ),
      persist: true,
      preventDuplicate: true,
      variant: 'warning'
    });
  };

  const onActive = async () => {
    try {
      await refreshSession(session);
    } catch {
      logout();
    }
  };

  const onIdle = () => {
    if (session) {
      displaySnackbarMessage({
        text: 'Logging you out due to inactivity.',
        action: (snackbarKey: any) => (
          <SnackbarAction snackbarKey={snackbarKey} setActivity={setActivity} />
        ),
        persist: true,
        preventDuplicate: true,
        variant: 'error'
      });
      logout();
      closeSidebar();
      navigate('/login');
    }
  };

  const { activate } = useIdleTimer({
    onPrompt: onPrompt,
    onActive: onActive,
    onIdle: onIdle,
    timeout: timeout,
    promptTimeout: promptTimeout
  });

  useEffect(() => {
    if (activity) {
      activate();
      setActivity(false);
    }
  }, [activity, activate]);

  const debug = false;
  return debug ? (
    <FooterBar>
      <span>Timeout: {timeout}ms</span>
      <span>Remaining: {remaining}ms</span>
      <span>Elapsed: {elapsed}ms</span>
      <span>Last active: {format(lastActive, 'HH:mm:ss')}</span>
      <span>Idle: {isIdle ? 'Yes' : 'No'}</span>
      <div>
        <button onClick={handleReset}>RESET</button>
        <button onClick={handlePause}>PAUSE</button>
        <button onClick={handleResume}>RESUME</button>
      </div>
    </FooterBar>
  ) : null;
}
