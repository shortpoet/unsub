import { useCallback, useState } from 'react';
import { Box, TableContainer } from '@mui/material';

import { SubTitle, Label, Section } from '../../UI';
import { GmailMessageDTO } from '../../../types/messageDTO';
import { useCheckAuthentication } from '../../../hook/AuthenticationHook';
import { myPalette } from '../../../Theme';
import styled from 'styled-components';
import { Table } from '../../table/Table';
import TABLES from '../../table/Tables';
import { MessageListTable } from './MessageListTable';

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

const MessageInfo = (props: { message: GmailMessageDTO }) => {
  const [tableData, setTableData] = useState();

  const { message } = props;
  return (
    <MessageListBox
      sx={{ display: 'flex', flexDirection: 'column' }}
      key={message.gmailId}>
      <SubTitle>{message.subject}</SubTitle>
      <Label>{message.from}</Label>
      <Label>{message.subject}</Label>
      <Label>{message.status}</Label>
    </MessageListBox>
  );
};

export function MessageListInfo(props: { message: GmailMessageDTO }) {
  const { message } = props;

  useCheckAuthentication();
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
}
