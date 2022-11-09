import { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';

import { GmailMessageDTO } from '../../@types/messageDTO';
import { useCheckAuthentication } from '../../hook/AuthenticationHook';
import { myPalette } from '../../Theme';
import styled from 'styled-components';
import { MessageListSection } from './messageList/MessageListSection';

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
        <MessageBox
          sx={{ flexDirection: 'row' }}
          key={`${message.gmailId}-message-list-box`}>
          <MessageListSection
            message={message}
            key={`${message.gmailId}-message-list-section`}
          />
          <Divider key={`${message.gmailId}-message-list-divider`} />
        </MessageBox>
      ))}
    </Box>
  );
}
