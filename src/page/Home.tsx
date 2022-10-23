import React, { FC, useEffect, useState } from 'react';
import Page, { PageToolbar } from '../component/Page';
import { TopBar } from '../component/UI';
import { MessageView } from '../component/message/MessageView';
import { MessageList } from '../component/message/MessageList';

import { Container } from '@mui/material';

import { Input, SubTitle } from '../component/UI';
import { useCheckAuthentication } from '../hook/AuthenticationHook';
import { CountSection } from '../component/section/CountSection';
import { IApiConfig } from '../api/IApi';
import { MessageApi } from '../api/MessageApi';
import { GmailMessageDTO } from '../types/messageDTO';

export function Home() {
  const [showToolbar, setShowToolbar] = useState(false);
  // const [showSidebar, setShowSidebar] = useState(0);
  // const [showFooter, setShowFooter] = useState(1);
  // const [interval, setInterval] = useState('ALL');

  const [messages, setMessages] = useState([] as GmailMessageDTO[]);
  const [messageId, setMessageId] = useState('message_id');

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
        q: 'mous',
        fetchCount: 100
      };
      // const response = await api.getMessages(params);
      // const data = response.messages;
      try {
        const response = await api.getMessagesParsed(params);
        const data = response.dto;
        setMessages(data);
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
    <Page title="Home" showToolbar={showToolbar}>
      <PageToolbar>
        <h1>Page toolbar</h1>
        <Container maxWidth="xl">
          <h1>Home Container</h1>
          <TopBar>
            <h1>TopBar</h1>
          </TopBar>
        </Container>
        <Container maxWidth="xl">
          <SubTitle>Subtitle</SubTitle>
          {messages.length > 0 && <CountSection messages={messages} />}
          {messages.length > 0 && <MessageView messages={messages} />}
        </Container>
      </PageToolbar>
    </Page>
  );
}
