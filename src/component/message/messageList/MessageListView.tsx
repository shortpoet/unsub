import React, { FC, useCallback, useEffect, useState } from 'react';
import { Container, Divider } from '@mui/material';

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

export function MessageListView(props: { message: GmailMessageDTO }) {
  const [message, setMessages] = useState(props.message);

  useCheckAuthentication();
  useEffect(() => {
    setMessages(props.message);
  }, [props]);
  return (
    <MessageContainer maxWidth="lg">
      <div key={message.gmailId}>
        <h3>{message.from}</h3>
        <h5>{message.subject}</h5>
        <p>{message.gmailId}</p>
        {message.status === 'HAS_MAILTO' && <p>Has mailto</p>}
        <p>{message.status}</p>
        <a href={message.listUnsubscribe}>unsub from {message.domain}</a>
        <Divider />
      </div>
    </MessageContainer>
  );
}
