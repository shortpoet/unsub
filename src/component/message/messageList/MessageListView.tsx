import React, { FC, useCallback, useEffect, useState } from 'react';
import { Box, Container, Divider } from '@mui/material';

// import Page, { PageToolbar } from '../component/Page';
// import { TopBar } from '../component/UI';
import { SubTitle, Label } from '../../UI';
// import { Message } from '../model/Message';
import { IApiConfig } from '../../../api/IApi';
import { MessageApi } from '../../../api/MessageApi';
import { GmailMessageDTO } from '../../../types/messageDTO';
import { useCheckAuthentication } from '../../../hook/AuthenticationHook';
import { myPalette } from '../../../Theme';
import styled from 'styled-components';
import {
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { PuppeteerApi } from '../../../api/PuppeteerApi';

const MessageListBox = styled(Box)`
  background-color: ${myPalette.page.lightGrey};
  scroll-behavior: smooth;
  width: 50%;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
`;
// justify-content: center;
// scroll-snap-align: start;
// overflow-y: scroll;

export function MessageListView(props: { message: GmailMessageDTO }) {
  const [message, setMessages] = useState(props.message);

  useCheckAuthentication();
  useEffect(() => {
    setMessages(props.message);
  }, [props]);
  return (
    <MessageListBox>
      <div key={message.gmailId}>
        <h3>{message.from}</h3>
        <h5>{message.subject}</h5>
        <p>{message.gmailId}</p>
        {message.status === 'HAS_MAILTO' && <p>Has mailto</p>}
        <p>{message.status}</p>
        <a href={message.listUnsubscribe}>unsub from {message.domain}</a>
      </div>
    </MessageListBox>
  );
}
