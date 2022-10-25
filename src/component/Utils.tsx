import React from 'react';
import { Container } from '@mui/material';
import { SubTitle } from './UI';

export function Loading() {
  return (
    <Container maxWidth="xl">
      <SubTitle>Loading...</SubTitle>
    </Container>
  );
}

export const PrettyPrintJson = React.memo(({ data }: any) => (
  <div>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
));
