import React, { FC, useEffect, useState } from 'react';
import Page, { PageToolbar } from '../component/Page';
import { TopBar } from '../component/UI';

import { Container } from '@mui/material';

import { useCheckAuthentication } from '../hook/AuthenticationHook';
import { IApiConfig } from '../api/IApi';
import { MessageApi } from '../api/MessageApi';
import { GmailMessageDTO } from '../types/messageDTO';
import { Loading, PrettyPrintJson } from '../component/Utils';
import { AccountSwitch } from '../component/AccountSwitch';
import { Account } from '../types/Session';
import styled from 'styled-components';
import { myPalette } from '../Theme';
import { MessageViewSwitch } from '../component/message/MessageViewSwitch';
import { MessageSectionTypes } from '../component/section/MessageSection';
import { TableSection } from '../component/section/TableSection';

const TableContainer = styled(Container)`
  background-color: ${myPalette.page.lightGrey};
  scroll-behavior: smooth;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  height: 100%;

  word-wrap: break-word;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  scroll-snap-align: start;
  overflow-y: scroll;
`;

export function TablesPage() {
  const [showToolbar, setShowToolbar] = useState(true);
  const [error, setError] = useState(false);
  const [errorJson, setErrorJson] = useState('');
  const [account, setAccount] = useState('' as Account['type']);
  // const [showSidebar, setShowSidebar] = useState(0);
  // const [showFooter, setShowFooter] = useState(1);
  // const [interval, setInterval] = useState('ALL');

  const [messages, setMessages] = useState([] as GmailMessageDTO[]);
  const [messageId, setMessageId] = useState('message_id');
  const [messageViewType, setMessageSectionType] = useState(
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

  return (
    <Page title="Tables" showToolbar={showToolbar}>
      <PageToolbar>
        <Container maxWidth="xl">
          <TopBar>
            <AccountSwitch onChange={setAccount} />
            <MessageViewSwitch onChange={setMessageSectionType} />
          </TopBar>
        </Container>
      </PageToolbar>
      {(messages.length > 0 && <TableSection />) ||
        (error && <PrettyPrintJson data={errorJson} />) || <Loading />}
    </Page>
  );
}
