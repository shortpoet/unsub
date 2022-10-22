import React, { FC, useCallback, useEffect, useState } from 'react';
import { Container } from '@mui/material';

import { SubTitle, Input } from '../UI';

export interface Message {
  id: string;
}

export function MessageSelector() {
  const [messages, setMessages] = useState([] as string[]);
  const [messageId, setMessageId] = useState('message_id');

  return (
    <Container maxWidth="xl">
      <SubTitle>Message Id</SubTitle>
      <Input
        type="text"
        value={messageId}
        onChange={e => setMessageId(e.target.value)}
      />
    </Container>
  );
}
