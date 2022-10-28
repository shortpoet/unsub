import React, { FC, useCallback, useEffect, useState } from 'react';
import { Container, Divider } from '@mui/material';

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
import { PuppeteerApi } from '../../../api/PuppeteerApi';

const MessageContainer = styled(Container)`
  background-color: ${myPalette.page.lightGrey};
  scroll-behavior: smooth;
  box-sizing: border-box;
  padding: 1rem;
  margin: 1rem 0 0 0;
  border: 0.5rem solid ${myPalette.deepPurple.dark};
  width: 100vw;
  height: 50vh;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  scroll-snap-align: start;
  overflow-y: scroll;
`;

const ViewFormControl = styled.div`
  flex-grow: 1;
`;

const ToggleViewGroup = styled(ToggleButtonGroup)`
  display: flex;
  width: 100%;
`;

const ViewButton = styled(ToggleButton)`
  flex-grow: 1;
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

export function MessageControlPanel(props: { message: GmailMessageDTO }) {
  const [message, setMessage] = useState(props.message);

  useCheckAuthentication();

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
  return (
    <MessageContainer maxWidth="lg">
      <ViewButton
        value={message.gmailId}
        onClick={async () => {
          await runPuppeteer({ gmailIds: [message.gmailId] });
        }}>
        unsub {message.domain}
      </ViewButton>
      {/* <ViewFormControl>
          <Label>View Type: </Label>
          <ToggleViewGroup
            id="view-type"
            color="primary"
            value={messageViewType}
            exclusive
            onChange={(event, newViewType) => {
              if (newViewType !== null) {
                setMessageSectionType(newViewType);
              }
            }}>
            <ViewButton size="small" value="raw">
              Raw
            </ViewButton>
            <ViewButton size="small" value="list">
              List
            </ViewButton>
          </ToggleViewGroup>
        </ViewFormControl> */}
    </MessageContainer>
  );
}
