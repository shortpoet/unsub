import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Grid, TextField } from '@mui/material';
import { login } from '../event/Action';
// import { useAppDispatch, useAppSelector } from '../hook/StoreHook';
import { validateUser } from '../api/AuthApi';
import { useSession } from '../hook/SessionHook';

const Message = styled.div`
  margin: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #333;
`;

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const session = useSession();
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  // const { user } = useAppSelector(state => state.auth);

  const handleChange = (setter: any) => (event: any) => {
    setter(event.target.value);
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);

  const handleRedirect = (session: any) => {
    if (session) {
      navigate('/');
    }
  };

  // endless redirect becasue of calling validate user/login
  // if using handleLogin
  useEffect(() => {
    handleRedirect(session);
  }, []);

  const handleLogin = async () => {
    try {
      const newSession = await validateUser(username, password);
      login(newSession);
      handleRedirect(newSession);
    } catch (e: any) {
      console.error('[error]', e);
      setMessage(e || 'Unknown error');
      setError(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Username"
            onChange={e => handleChange(setUsername)(e)}
            value={username}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            onChange={handleChange(setPassword)}
            type="password"
            value={password}
          />
        </Grid>
        <Grid item xs={12}>
          <Message>{message}</Message>
          <Button
            color="primary"
            fullWidth
            onClick={handleLogin}
            variant="contained">
            Login
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
