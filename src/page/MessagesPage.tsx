import React, { FC, useEffect, useState } from 'react';
import Page, { PageToolbar } from '../component/Page';
import { TopBar } from '../component/UI';
import { MessageList } from '../component/message/MessageList';

import { Container } from '@mui/material';

import { Input, SubTitle } from '../component/UI';
import { useCheckAuthentication } from '../hook/AuthenticationHook';
import { CountSection } from '../component/section/CountSection';
import { IApiConfig } from '../api/IApi';
import { MessageApi } from '../api/MessageApi';
import { GmailMessageDTO } from '../@types/messageDTO';
import { Loading, PrettyPrintJson } from '../component/Utils';
import { AccountSwitch } from '../component/AccountSwitch';
import { Account } from '../@types/Session';
import styled from 'styled-components';
import { myPalette } from '../Theme';
import { MessageViewSwitch } from '../component/message/MessageViewSwitch';
import {
  MessageSection,
  MessageSectionTypes
} from '../component/section/MessageSection';
import { TableSection } from '../component/section/TableSection';

const MessageContainer = styled(Container)`
  background-color: ${myPalette.page.lightGrey};
  scroll-behavior: smooth;
  padding: 1rem 0rem 5rem 0rem;
  height: 100%;
  width: 100%;
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
  messageSectionType: MessageSectionTypes;
}) {
  const { messages, messageSectionType } = props;
  return (
    <MessageContainer maxWidth={false}>
      {messages.length > 0 && <CountSection messages={messages} />}
      {messages.length > 0 && (
        <MessageSection
          messages={messages}
          messageSectionType={messageSectionType}
        />
      )}
    </MessageContainer>
  );
}

export function MessagesPage() {
  const [showToolbar, setShowToolbar] = useState(true);
  const [error, setError] = useState(false);
  const [errorJson, setErrorJson] = useState('');
  const [account, setAccount] = useState('' as Account['type']);
  // const [showSidebar, setShowSidebar] = useState(0);
  // const [showFooter, setShowFooter] = useState(1);
  // const [interval, setInterval] = useState('ALL');

  const [messages, setMessages] = useState([] as GmailMessageDTO[]);
  const [messageId, setMessageId] = useState('message_id');
  const [messageSectionType, setMessageSectionType] = useState(
    'raw' as MessageSectionTypes
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
  const handleSetSectionType = (type: MessageSectionTypes) => {
    setMessageSectionType(type);
  };
  return (
    <Page title="Messages" showToolbar={showToolbar}>
      <PageToolbar>
        <Container maxWidth="xl">
          <TopBar>
            <AccountSwitch onChange={setAccount} />
            <MessageViewSwitch onChange={handleSetSectionType} />
          </TopBar>
        </Container>
      </PageToolbar>
      {(messages.length > 0 && (
        <MessagesFC
          messages={messages}
          messageSectionType={messageSectionType}
        />
      )) ||
        (error && <PrettyPrintJson data={errorJson} />) || <Loading />}
    </Page>
  );
}
