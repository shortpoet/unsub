import React, { useState } from 'react';
import Page, { PageToolbar } from '../component/Page';
import { Title, TopBar } from '../component/UI';

import { Container, Button } from '@mui/material';

import { useCheckAuthentication } from '../hook/AuthenticationHook';
import { AccountSwitch } from '../component/AccountSwitch';
import { Account } from '../types/Session';
import styled from 'styled-components';
import { myPalette } from '../Theme';
import { Link } from 'react-router-dom';

const HomeContainer = styled(Container)`
  background-color: ${myPalette.page.mediumGrey};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

function HomeButton(props: {
  to: string;
  text: string;
  variant?: 'text' | 'outlined' | 'contained';
}) {
  return (
    <Button
      variant="contained"
      component={Link}
      to={props.to}
      style={{
        display: 'flex',
        margin: '1rem',
        backgroundColor: myPalette.green.dark,
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        padding: '1rem',
        borderRadius: '0.5rem',
        textDecoration: 'none'
      }}>
      {props.text}
    </Button>
  );
}

export function Home() {
  const [showToolbar, setShowToolbar] = useState(true);
  const [account, setAccount] = useState('' as Account['type']);
  // const [showSidebar, setShowSidebar] = useState(0);
  // const [showFooter, setShowFooter] = useState(1);
  // const [interval, setInterval] = useState('ALL');

  useCheckAuthentication();

  return (
    <Page title="Home" showToolbar={showToolbar}>
      <PageToolbar>
        {/* <h1>Page toolbar</h1> */}
        <Container maxWidth="xl">
          {/* <h1>Home Container</h1> */}
          <TopBar>
            <AccountSwitch onChange={setAccount} />
          </TopBar>
        </Container>
      </PageToolbar>
      <HomeContainer maxWidth="xl">
        <Title>Home</Title>
        <HomeButton to="/messages" variant="contained" text="Messages" />
      </HomeContainer>
    </Page>
  );
}
