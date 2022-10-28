import React, { FC, useCallback, useEffect, useState } from 'react';
import { Box, Container, Divider } from '@mui/material';

import { GmailMessageDTO } from '../../../types/messageDTO';
import { useCheckAuthentication } from '../../../hook/AuthenticationHook';
import { myPalette } from '../../../Theme';
import styled from 'styled-components';
import { MessageListView } from './MessageListView';
import { MessageControlPanel } from './MessageControlPanel';

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

export function MessageListSection(props: { message: GmailMessageDTO }) {
  const [message, setMessage] = useState(props.message);
  const [messageListViewType, setMessageListViewType] = useState('info');

  useCheckAuthentication();

  useEffect(() => {
    setMessage(props.message);
  }, [props]);

  // regular (non-memoized) version of this function also works)
  return (
    <MessageBox sx={{ flexDirection: 'row' }}>
      <MessageControlPanel
        key={`${message.gmailId}-control`}
        message={message}
        onChange={setMessageListViewType}
      />
      <MessageListView
        key={`${message.gmailId}-list-view`}
        message={message}
        messageListViewType={messageListViewType}
      />
      <Divider />
    </MessageBox>
  );
}
