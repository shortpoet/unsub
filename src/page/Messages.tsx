import React, { FC, useEffect, useState } from 'react';
import Page, { PageToolbar } from '../component/Page';
import { TopBar } from '../component/UI';
import {
  MessageView,
  MessageViewTypes
} from '../component/message/MessageView';
import { MessageList } from '../component/message/MessageList';

import { Container } from '@mui/material';

import { Input, SubTitle } from '../component/UI';
import { useCheckAuthentication } from '../hook/AuthenticationHook';
import { CountSection } from '../component/section/CountSection';
import { IApiConfig } from '../api/IApi';
import { MessageApi } from '../api/MessageApi';
import { GmailMessageDTO } from '../types/messageDTO';
import { Loading, PrettyPrintJson } from '../component/Utils';
import { AccountSwitch } from '../component/AccountSwitch';
import { Account } from '../types/Session';
import styled from 'styled-components';
import { myPalette } from '../Theme';
import { ViewSwitch } from '../component/ViewSwitch';

const MessageContainer = styled(Container)`
  background-color: ${myPalette.page.lightGrey};
  scroll-behavior: smooth;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0.5rem solid ${myPalette.deepPurple.dark};
  width: 100vw;
  height 81vh;

  word-wrap: break-word;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  scroll-snap-align: start;
  overflow-y: scroll;
`;

function MessagesFC(props: {
  messages: GmailMessageDTO[];
  messageViewType: MessageViewTypes;
}) {
  const { messages, messageViewType } = props;
  return (
    <MessageContainer maxWidth="xl">
      <SubTitle>Loaded Messages</SubTitle>
      {messages.length > 0 && <CountSection messages={messages} />}
      {messages.length > 0 && (
        <MessageView messages={messages} messageViewType={messageViewType} />
      )}
    </MessageContainer>
  );
}

export function Messages() {
  const [showToolbar, setShowToolbar] = useState(true);
  const [error, setError] = useState(false);
  const [errorJson, setErrorJson] = useState('');
  const [account, setAccount] = useState('' as Account['type']);
  // const [showSidebar, setShowSidebar] = useState(0);
  // const [showFooter, setShowFooter] = useState(1);
  // const [interval, setInterval] = useState('ALL');

  const [messages, setMessages] = useState([] as GmailMessageDTO[]);
  const [messageId, setMessageId] = useState('message_id');
  const [messageViewType, setMessageViewType] = useState(
    'raw' as MessageViewTypes
  );

  useCheckAuthentication();

  useEffect(() => {
    (async () => {
      const config: IApiConfig = {
        baseURL: 'http://localhost:3000',
        timeout: 10000
      };
      const api = new MessageApi(config);
      const params = {
        userId: 'me',
        // q: 'mous',
        fetchCount: 100
      };
      // const response = await api.getMessages(params);
      // const data = response.messages;
      try {
        const response = await api.getMessages(params);
        // console.log(inspect(response, { depth: 5, colors: false }));
        if (response.data) {
          setMessages(response.data);
        }
        if (response.error) {
          console.error(response.error);
          setError(true);
          setErrorJson(response.error);
        }
      } catch (e) {
        console.error('[error]', e);
      }
    })();
  }, []);

  const handleSelectedToolbar = (event: {
    target: { value: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setShowToolbar(event.target.value);
  };

  return (
    <Page title="Messages" showToolbar={showToolbar}>
      <PageToolbar>
        <Container maxWidth="xl">
          <TopBar>
            <AccountSwitch onChange={setAccount} />
            <ViewSwitch onChange={setMessageViewType} />
          </TopBar>
        </Container>
      </PageToolbar>
      {(messages.length > 0 && (
        <MessagesFC messages={messages} messageViewType={messageViewType} />
      )) ||
        (error && <PrettyPrintJson data={errorJson} />) || <Loading />}
    </Page>
  );
}
