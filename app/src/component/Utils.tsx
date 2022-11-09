import React from 'react';
import { Container } from '@mui/material';
import { SubTitle } from './UI';
import styled from 'styled-components';

export function Loading() {
  return (
    <Container maxWidth="xl" style={{ padding: '1rem' }}>
      <SubTitle>Loading...</SubTitle>
    </Container>
  );
}

const WordWrapPre = styled.pre`
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const PrettyPrintJson = React.memo(({ data }: any) => (
  <div>
    <WordWrapPre>{JSON.stringify(data, null, 2)}</WordWrapPre>
  </div>
));

// export function ConditionalLoad = (component) => {
//   return       {(messages.length > 0 && <Messages messages={messages} />) ||
//   (error && <PrettyPrintJson data={errorJson} />) || <Loading />}

// }
