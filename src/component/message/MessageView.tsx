import React, { FC, useCallback, useEffect, useState } from 'react';
import { Container } from '@mui/material';

// import Page, { PageToolbar } from '../component/Page';
// import { TopBar } from '../component/UI';
import { SubTitle } from '../UI';
// import { Message } from '../model/Message';
import { IApiConfig } from '../../api/IApi';
import { MessageApi } from '../../api/MessageApi';

export interface Message {
  id: string;
}

export function MessageView() {
  const [messages, setMessages] = useState([] as string[]);
  const [messageId, setMessageId] = useState('message_id');

  // useCheckAuthentication();

  useEffect(() => {
    (async () => {
      const config: IApiConfig = {
        baseURL: 'http://localhost:3000',
        timeout: 10000
      };
      const api = new MessageApi(config);
      const response = await api.getMessages();
      const data = response.messages[0];
      setMessages(data);
    })();
  }, []);

  const PrettyPrintJson = React.memo(({ data }: any) => (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  ));

  return (
    <Container maxWidth="lg">
      <SubTitle>Messages</SubTitle>
      <PrettyPrintJson data={messages} />
    </Container>
  );
}
