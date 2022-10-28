import React, { FC, useCallback, useEffect, useState } from 'react';
import { Box, Container, Divider } from '@mui/material';

// import Page, { PageToolbar } from '../component/Page';
// import { TopBar } from '../component/UI';
import { SubTitle, Label } from '../../UI';
// import { Message } from '../model/Message';
import { IApiConfig } from '../../../api/IApi';
import { MessageApi } from '../../../api/MessageApi';
import { GmailMessageDTO } from '../../../types/messageDTO';
import { useCheckAuthentication } from '../../../hook/AuthenticationHook';
import { myPalette } from '../../../Theme';
import styled from 'styled-components';
import {
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { PuppeteerApi, PuppeteerParams } from '../../../api/PuppeteerApi';

const MessageListBox = styled(Box)`
  background-color: ${myPalette.page.lightGrey};
  scroll-behavior: smooth;
  width: 50%;

  display: flex;
  flex-grow: 1;
  flex-direction: row;
`;
// justify-content: center;
// scroll-snap-align: start;
// overflow-y: scroll;

const ViewFormControl = styled.div`
  flex-grow: 1;
`;

const ToggleViewGroup = styled(ToggleButtonGroup)`
  display: flex;
  width: 100%;
`;

const ViewButton = styled(ToggleButton)`
  margin: 0.5rem;
  justify-content: space-between;
  && {
    margin: 0rem 0.5rem 0rem 0rem;
    border-radius: 0.25rem;
    background-color: ${myPalette.green.faded};
    color: ${myPalette.green.dark};
    text-transform: none;
    &:hover {
      background-color: ${myPalette.green.dark};
      color: ${myPalette.page.lightGrey};
    }
    &.Mui-selected {
      background-color: ${myPalette.green.dark};
      color: ${myPalette.page.lightGrey};
    }
  }
`;

export function MessageControlPanel(props: {
  message: GmailMessageDTO;
  onChange: (value: string) => void;
}) {
  const [message, setMessage] = useState(props.message);
  const [messageListViewType, setMessageListViewType] = useState('info');

  useCheckAuthentication();

  useEffect(() => {
    props.onChange(messageListViewType);
  }, [messageListViewType]);

  useEffect(() => {
    setMessage(props.message);
  }, [props]);

  // regular (non-memoized) version of this function also works)
  const runPuppeteer = useCallback(
    async (gmailIds: { gmailIds: GmailMessageDTO['gmailId'][] }) => {
      const config: IApiConfig = {
        baseURL: 'http://localhost:3000',
        timeout: 10000
      };
      const api = new PuppeteerApi(config);
      const response = await api.run(gmailIds);
      console.log('response', response);
    },
    []
  );
  const getPuppeteerElements = useCallback(async (params: PuppeteerParams) => {
    const config: IApiConfig = {
      baseURL: 'http://localhost:3000',
      timeout: 10000
    };
    const api = new PuppeteerApi(config);
    const response = await api.getElements(params);
    console.log('getPuppeteerElements - response', response);
  }, []);
  return (
    <MessageListBox>
      <ViewButton
        value={message.gmailId}
        onClick={async () => {
          if (message.status === 'HAS_MAILTO') {
            console.log('message has mailto', message.mailto);
          }
          await getPuppeteerElements({
            gmailIds: [message.gmailId],
            elementType: 'input'
          });
        }}>
        unsub {message.domain}
      </ViewButton>
      <ViewFormControl>
        <Label>View Type: </Label>
        <ToggleViewGroup
          id="view-type"
          color="primary"
          value={messageListViewType}
          exclusive
          onChange={(event, newViewType) => {
            if (newViewType !== null) {
              setMessageListViewType(newViewType);
            }
          }}>
          <ViewButton size="small" value="info">
            Info
          </ViewButton>
          <ViewButton size="small" value="puppeteer">
            Pptr
          </ViewButton>
        </ToggleViewGroup>
      </ViewFormControl>
    </MessageListBox>
  );
}
