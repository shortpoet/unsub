<script src="http://localhost:8097"></script>;
import React, { RefObject } from 'react';

import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { useHandler } from '@aux4/use-handler';
import { useSnackbar } from 'notistack';

import { Button, ThemeProvider } from '@mui/material';
import styled from 'styled-components';

import { theme } from './Theme';
import { PageRouter } from './PageRouter';
import { useSession } from './hook/SessionHook';
import { Header } from './component/Header';
import { LOGOUT } from './event/Event';
import { removeCredentials } from './api/SecurityApi';
import { Footer } from './component/Footer';
import { Sidebar } from './component/Sidebar';
import { IdleTimer } from './component/IdleTimer';
import { SnackbarMessages } from './component/SnackbarMessages';

const DismissButton = styled(Button)`
  && {
    margin-left: auto;
    color: ${theme.palette.grey[500]};
  }
`;
function App() {
  const session = useSession();
  const snackbarRef: RefObject<SnackbarProvider> = React.createRef();
  const onClickDismiss = (key: any) => () => {
    snackbarRef?.current?.closeSnackbar(key);
  };
  // const onClickDismiss = () => { closeSnackbar(snackbarKey); };

  useHandler(() => {
    removeCredentials();
  }, [LOGOUT]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <SnackbarProvider
          ref={snackbarRef}
          maxSnack={3}
          action={key => (
            <DismissButton onClick={onClickDismiss(key)}>Dismiss</DismissButton>
          )}>
          <Header />
          <Sidebar />
          <PageRouter />
          <SnackbarMessages />
          <Footer theme={theme} />
          {session && <IdleTimer />}
        </SnackbarProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
