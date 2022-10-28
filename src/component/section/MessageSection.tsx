import React, { FC, useCallback, useEffect, useState } from 'react';
import { Container } from '@mui/material';

// import Page, { PageToolbar } from '../component/Page';
// import { TopBar } from '../component/UI';
import { SubTitle } from '../UI';
// import { Message } from '../model/Message';
import { IApiConfig } from '../../api/IApi';
import { MessageApi } from '../../api/MessageApi';
import { useCheckAuthentication } from '../../hook/AuthenticationHook';
import { GmailMessageDTO } from '../../types/messageDTO';
import { PrettyPrintJson } from '../Utils';
import { myPalette } from '../../Theme';
import styled from 'styled-components';
import { MessageList } from '../message/MessageList';

export interface Message {
  id: string;
}

const MessageContainer = styled(Container)`
  background-color: ${myPalette.page.lightGrey};
  scroll-behavior: smooth;
  box-sizing: border-box;
  padding: 1rem;
  margin: 1rem 0 0 0;
  border: 0.5rem solid ${myPalette.deepPurple.dark};
  border-radius: 0.25rem;
  width: 100vw;
  height: 30rem;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  overflow-y: scroll;
`;

export type MessageSectionTypes = 'raw' | 'list' | undefined;

export function MessageSection(props: {
  messages: GmailMessageDTO[];
  messageViewType: MessageSectionTypes;
}) {
  const { messages, messageViewType } = props;
  const RenderSwitch = useCallback(
    (props: { messageViewType: MessageSectionTypes }) => {
      switch (props.messageViewType) {
        case 'raw':
          return <PrettyPrintJson data={messages} />;
        case 'list':
          return <MessageList messages={messages} />;
        default:
          return <PrettyPrintJson data={messages} />;
      }
    },
    [messages, messageViewType]
  );

  // useEffect(() => {
  //   setMessages(props.messages);
  // }, [props]);

  return (
    <MessageContainer maxWidth="xl">
      <RenderSwitch messageViewType={messageViewType} />
    </MessageContainer>
  );
}
