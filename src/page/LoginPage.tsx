import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Grid, TextField } from '@mui/material';
import { login } from '../event/Action';
// import { useAppDispatch, useAppSelector } from '../hook/StoreHook';
import { validateUser } from '../api/AuthApi';

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
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  // const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);

  const handleLogin = async () => {
    try {
      const session = await validateUser(username, password);
      if (session) {
        navigate('/');
      }
    } catch (e: any) {
      console.error('[error]', e);
      setMessage(e.message || 'Unknown error');
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
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            onChange={e => setPassword(e.target.value)}
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
