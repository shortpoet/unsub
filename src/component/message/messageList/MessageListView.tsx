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
import { MessageListInfo } from './MessageListInfo';

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
            <MessageListTable
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
