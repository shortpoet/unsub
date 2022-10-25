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
import { colorLog } from '../util/colorLog';
import { inspect } from 'util';
import { PrettyPrintJson } from '../component/PrettyPrintJson';

export function Home() {
  const [showToolbar, setShowToolbar] = useState(false);
  const [error, setError] = useState(false);
  const [errorJson, setErrorJson] = useState('');
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
        // q: 'mous',
        fetchCount: 100
      };
      // const response = await api.getMessages(params);
      // const data = response.messages;
      try {
        const response = await api.getMessagesParsed(params);
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

  function Messages(props: { messages: GmailMessageDTO[] }) {
    const { messages } = props;
    return (
      <Container maxWidth="xl">
        <SubTitle>Loaded Messages</SubTitle>
        {messages.length > 0 && <CountSection messages={messages} />}
        {messages.length > 0 && <MessageView messages={messages} />}
      </Container>
    );
  }

  function Loading() {
    return (
      <Container maxWidth="xl">
        <SubTitle>Loading...</SubTitle>
      </Container>
    );
  }

  return (
    <Page title="Home" showToolbar={showToolbar}>
      <PageToolbar>
        <h1>Page toolbar</h1>
        <Container maxWidth="xl">
          <h1>Home Container</h1>
          <TopBar>
            <h1>TopBar</h1>
          </TopBar>
          {(messages.length > 0 && <Messages messages={messages} />) ||
            (error && <PrettyPrintJson data={errorJson} />) || <Loading />}
          {/* {(messages && <Messages messages={messages} />) ||
            (error && <PrettyPrintJson messages={errorJson} />) || <Loading />} */}
        </Container>
      </PageToolbar>
    </Page>
  );
}
