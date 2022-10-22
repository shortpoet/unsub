<script src="http://localhost:8097"></script>;
import React, { RefObject } from 'react';
import logo from './logo.svg';

import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { useHandler } from '@aux4/use-handler';
import { useSnackbar } from 'notistack';

import { Button, ThemeProvider } from '@mui/material';
import styled from 'styled-components';

import { theme } from './Theme';
import { PageRouter } from './PageRouter';

const DismissButton = styled(Button)`
  && {
    margin-left: auto;
    color: ${theme.palette.grey[500]};
  }
`;
function App() {
  // const session = useSession();
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // const [snackbarKey, setSnackbarKey] = React.useState(null);
  // const [snackbarMessage, setSnackbarMessage] = React.useState(null);
  // const [snackbarOptions, setSnackbarOptions] = React.useState(null);
  // const [snackbarDismiss, setSnackbarDismiss] = React.useState(null);
  // const [snackbarDismissAll, setSnackbarDismissAll] = React.useState(null);
  // const [snackbarDismissAllByType, setSnackbarDismissAllByType] = React.useState(null);
  const snackbarRef: RefObject<SnackbarProvider> = React.createRef();
  const onClickDismiss = (key: any) => () => {
    snackbarRef?.current?.closeSnackbar(key);
  };
  // const onClickDismiss = () => { closeSnackbar(snackbarKey); };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <SnackbarProvider
          maxSnack={3}
          ref={snackbarRef}
          action={key => (
            <DismissButton onClick={() => onClickDismiss(key)}>
              Dismiss
            </DismissButton>
          )}>
          <PageRouter />
        </SnackbarProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
