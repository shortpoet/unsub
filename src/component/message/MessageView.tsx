import React, { FC, useCallback, useEffect, useState } from 'react';
import { Container } from '@mui/material';

// import Page, { PageToolbar } from '../component/Page';
// import { TopBar } from '../component/UI';
import { SubTitle } from '../UI';
// import { Message } from '../model/Message';
import { IApiConfig } from '../../api/IApi';
import { MessageApi } from '../../api/MessageApi';
import { useCheckAuthentication } from '../../hook/AuthenticationHook';
import { GmailMessageDTO } from '../../types/messageDTO';
import { PrettyPrintJson } from '../PrettyPrintJson';

export interface Message {
  id: string;
}

export function MessageView(props: { messages: GmailMessageDTO[] }) {
  const [messages, setMessages] = useState([] as GmailMessageDTO[]);
  const [messageId, setMessageId] = useState('message_id');

  useEffect(() => {
    setMessages(props.messages);
  }, [props]);

  return (
    <Container maxWidth="lg">
      <SubTitle>Messages</SubTitle>
      <PrettyPrintJson data={messages} />
    </Container>
  );
}
