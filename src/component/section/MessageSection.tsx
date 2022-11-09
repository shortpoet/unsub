import { useCallback } from 'react';
import { Container } from '@mui/material';

import { GmailMessageDTO } from '../../@types/messageDTO';
import { PrettyPrintJson } from '../Utils';
import { myPalette } from '../../Theme';
import styled from 'styled-components';
import { MessageList } from '../message/MessageList';
import { MessageSearch } from '../message/MessageSearch';

export interface Message {
  id: string;
}

const MessageContainer = styled(Container)`
  background-color: ${myPalette.page.lightGrey};
  scroll-behavior: smooth;
  box-sizing: border-box;
  padding: 0rem 0rem 0rem 0rem;
  margin: 1rem 0 0 0;
  border: 0.5rem solid ${myPalette.deepPurple.dark};
  border-radius: 0.25rem;
  width: 100%;
  height: 50rem;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  overflow-y: scroll;
`;

export type MessageSectionTypes = 'raw' | 'list' | 'search' | undefined;

export function MessageSection(props: {
  messages: GmailMessageDTO[];
  messageSectionType: MessageSectionTypes;
}) {
  // using useState here will fuck you up
  // state never gets reset
  const { messages, messageSectionType } = props;
  const RenderSwitch = useCallback(
    (props: { messageSectionType: MessageSectionTypes }) => {
      switch (props.messageSectionType) {
        case 'raw':
          return <PrettyPrintJson data={messages} />;
        case 'list':
          return <MessageList messages={messages} />;
        case 'search':
          return <MessageSearch messages={messages} />;
        default:
          return <PrettyPrintJson data={messages} />;
      }
    },
    [messages, messageSectionType]
  );

  return (
    <MessageContainer maxWidth={false}>
      {/* <Section> */}
      <RenderSwitch messageSectionType={messageSectionType} />
      {/* </Section> */}
    </MessageContainer>
  );
}
