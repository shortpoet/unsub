import React, { FC, useCallback, useEffect, useState } from 'react';
import { Box, Container, Divider } from '@mui/material';

import { GmailMessageDTO } from '../../types/messageDTO';
import { useCheckAuthentication } from '../../hook/AuthenticationHook';
import { myPalette } from '../../Theme';
import styled from 'styled-components';
import { MessageListView } from './messageList/MessageListView';
import { MessageControlPanel } from './messageList/MessageControlPanel';

const MessageBox = styled(Box)`
  background-color: ${myPalette.page.lightGrey};
  scroll-behavior: smooth;
  box-sizing: border-box;

  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-content: flex-start;
`;

export function MessageList(props: { messages: GmailMessageDTO[] }) {
  const [messages, setMessages] = useState([] as GmailMessageDTO[]);

  useCheckAuthentication();

  useEffect(() => {
    setMessages(props.messages);
  }, [props]);

  // regular (non-memoized) version of this function also works)
  return (
    <Box>
      {messages.map(message => (
        <MessageBox sx={{ flexDirection: 'row' }}>
          <MessageControlPanel message={message} />
          <MessageListView message={message} />
          <Divider />
        </MessageBox>
      ))}
    </Box>
  );
}
