import React, { useState } from 'react';
import Page, { PageToolbar } from '../component/Page';
import { TopBar } from '../component/UI';

import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

export function Home() {
  const [showToolbar, setShowToolbar] = useState(false);
  const [showSidebar, setShowSidebar] = useState(0);
  const [showFooter, setShowFooter] = useState(1);
  const [interval, setInterval] = useState('ALL');

  // useCheckAuthentication();

  const handleSelectedToolbar = (event: {
    target: { value: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setShowToolbar(event.target.value);
  };

  return (
    <Page title="Home" showToolbar={showToolbar}>
      <PageToolbar>
        <h1>Page toolbar</h1>
        <Container maxWidth="xl">
          <h1>Home Container</h1>
          <TopBar>
            <h1>TopBar</h1>
          </TopBar>
        </Container>
      </PageToolbar>
    </Page>
  );
}
