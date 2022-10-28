import { useCallback } from 'react';
import { Box } from '@mui/material';

import { SubTitle, Label } from '../../UI';
import { GmailMessageDTO } from '../../../types/messageDTO';
import { useCheckAuthentication } from '../../../hook/AuthenticationHook';
import { myPalette } from '../../../Theme';
import styled from 'styled-components';

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

const MessageListInfo = (props: { message: GmailMessageDTO }) => {
  const { message } = props;
  return (
    <MessageListBox key={message.gmailId}>
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
};

const MessageListPuppeteerElements = (props: { message: GmailMessageDTO }) => {
  const { message } = props;
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
      key={message.gmailId}>
      <SubTitle>{message.subject}</SubTitle>
      <Label>{message.from}</Label>
      <Label>{message.subject}</Label>
      <Label>{message.status}</Label>
    </Box>
  );
};

export function MessageListView(props: {
  message: GmailMessageDTO;
  messageListViewType: string | undefined;
}) {
  const { message, messageListViewType } = props;
  const RenderSwitch = useCallback(
    (props: {
      message: GmailMessageDTO;
      messageListViewType: string | undefined;
    }) => {
      const value = props.messageListViewType;
      switch (value) {
        case 'info':
          return (
            <MessageListInfo
              message={message}
              key={`${message.gmailId}-info-view`}
            />
          );
        case 'puppeteer':
          return (
            <MessageListPuppeteerElements
              message={message}
              key={`${message.gmailId}-puppeteer-view`}
            />
          );
        default:
          return (
            <MessageListInfo
              message={message}
              key={`${message.gmailId}-info-view`}
            />
          );
      }
    },
    [message, messageListViewType]
  );

  useCheckAuthentication();
  return (
    <RenderSwitch
      message={message}
      messageListViewType={messageListViewType}
      key={message.gmailId}
    />
  );
}
