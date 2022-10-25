import React from 'react';
import styled from 'styled-components';

import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material';
// import { Menu as MenuIcon } from 'react-feather';
// import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { openSidebar } from '../event/Action';
import { useSession } from '../hook/SessionHook';
import logo from './logo.svg';
import { theme, myPalette } from '../Theme';
import { useNavigate } from 'react-router-dom';

const Bar = styled(AppBar)`
  background-color: ${myPalette.deepPurple.dark} !important;
  color: ${theme.palette.grey[400]} !important;
  box-shadow: none;
  border-bottom: 0.125rem solid ${myPalette.text.mute};

  display: flex;
  flex-direction: column;
  justify-content: center;
  scroll-snap-align: start;
  overflow-y: scroll;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > * {
    margin-left: auto;
  }
`;

export function Header() {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/', { replace: true });
  };

  const session = useSession();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Bar position="static">
        <Toolbar>
          {session && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={openSidebar}>
              <FontAwesomeIcon icon={faBars} />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ cursor: 'pointer' }}
            onClick={handleHomeClick}>
            Unsub App
          </Typography>
          {session && (
            <User>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                style={{ padding: '0.5rem' }}>
                {session?.user?.username}
              </Typography>
              <Avatar>
                <FontAwesomeIcon icon={faUser} />
              </Avatar>
            </User>
          )}
        </Toolbar>
      </Bar>
    </Box>
  );
}

// Compare this snippet from src/page/NotFoundPage.tsx:
// import React from 'react';
// import styled from 'styled-components';
// import { Link, useNavigate } from 'react-router-dom';
// import { Button, Container, Grid, TextField } from '@mui/material';
//
// const Message = styled.div`
//   margin: 0.5rem;
//   padding: 0.5rem;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   color: #333;
// `;
//
// export function NotFoundPage() {
//   return (
//     <Container maxWidth="sm">
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <Message>Page not found</Message>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }
//
// Compare this snippet from src/page/ProfilePage.tsx:
// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
// import { Button, Container, Grid, TextField } from '@mui/material';
// import { login } from '../event/Action';
// // import { useAppDispatch, useAppSelector } from '../hook/StoreHook';
// import { validateUser } from '../api/AuthApi';
//
// const Message = styled.div`
//   margin: 0.5rem;
//   padding: 0.5rem;
//   border: 1px solid #ccc;
//   border-radius:
