import React, { FC, useCallback, useEffect, useState } from 'react';
import { Container, Divider } from '@mui/material';

import { GmailMessageDTO } from '../../types/messageDTO';
import { useCheckAuthentication } from '../../hook/AuthenticationHook';
import { myPalette } from '../../Theme';
import styled from 'styled-components';
import { MessageListView } from './messageList/MessageListView';
import { MessageControlPanel } from './messageList/MessageControlPanel';

const MessageListContainer = styled(Container)`
  background-color: ${myPalette.page.lightGrey};
  scroll-behavior: smooth;
  box-sizing: border-box;
  padding: 1rem;
  margin: 1rem 0 0 0;
  width: 100vw;
  height: 50vh;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  scroll-snap-align: start;
  overflow-y: scroll;
`;

export function MessageList(props: { messages: GmailMessageDTO[] }) {
  const [messages, setMessages] = useState([] as GmailMessageDTO[]);

  useCheckAuthentication();

  useEffect(() => {
    setMessages(props.messages);
  }, [props]);

  // regular (non-memoized) version of this function also works)
  return (
    <MessageListContainer maxWidth="lg">
      {messages.map(message => (
        <>
          <MessageListView message={message} />
          <MessageControlPanel message={message} />
        </>
      ))}
    </MessageListContainer>
  );
}
