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
import { PrettyPrintJson } from '../Utils';
import { myPalette } from '../../Theme';
import styled from 'styled-components';

export interface Message {
  id: string;
}

const MessageContainer = styled(Container)`
  background-color: ${myPalette.page.lightGrey};
  scroll-behavior: smooth;
  box-sizing: border-box;
  padding: 1rem;
  margin: 1rem 0 0 0;
  border: 0.5rem solid ${myPalette.deepPurple.dark};
  width: 100vw;
  height: 50vh;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  scroll-snap-align: start;
  overflow-y: scroll;
`;

export function MessageView(props: { messages: GmailMessageDTO[] }) {
  const [messages, setMessages] = useState([] as GmailMessageDTO[]);
  const [messageId, setMessageId] = useState('message_id');

  useEffect(() => {
    setMessages(props.messages);
  }, [props]);

  return (
    <MessageContainer maxWidth="lg">
      <SubTitle>Messages</SubTitle>
      <PrettyPrintJson data={messages} />
    </MessageContainer>
  );
}
