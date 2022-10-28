import React, { FC, useCallback, useEffect, useState } from 'react';
import { Container, Divider } from '@mui/material';

// import Page, { PageToolbar } from '../component/Page';
// import { TopBar } from '../component/UI';
import { SubTitle, Label } from '../UI';
// import { Message } from '../model/Message';
import { IApiConfig } from '../../api/IApi';
import { MessageApi } from '../../api/MessageApi';
import { GmailMessageDTO } from '../../types/messageDTO';
import { useCheckAuthentication } from '../../hook/AuthenticationHook';
import { myPalette } from '../../Theme';
import styled from 'styled-components';
import {
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { PuppeteerApi } from '../../api/PuppeteerApi';

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

export function MessageList(props: { messages: GmailMessageDTO[] }) {
  const [messages, setMessages] = useState([] as GmailMessageDTO[]);

  useCheckAuthentication();

  useEffect(() => {
    setMessages(props.messages);
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
  let messageList: any = [];
  if (messages.length > 0) {
    messageList = messages.map((message: GmailMessageDTO) => (
      <Container key={message.gmailId}>
        <SubTitle>{message.from}</SubTitle>
        <h5>{message.subject}</h5>
        <ViewButton
          value={message.gmailId}
          onClick={async () => {
            await runPuppeteer({ gmailIds: [message.gmailId] });
          }}>
          unsub {message.domain}
        </ViewButton>
        <p>{message.gmailId}</p>
        {message.status === 'HAS_MAILTO' && <p>Has mailto</p>}
        <p>{message.status}</p>
        <a href={message.listUnsubscribe}>unsub link</a>
        <Divider />
        {/* <a href={message.listUnsubscribe.trim()}>{message.domain}</a> */}
      </Container>
    ));
  }
  return <Container maxWidth="lg">{messageList}</Container>;
}
// You'll need to either insert BR tag appropriately in the resulting string, or use for example a PRE tag so that the formatting of the stringify is retained:

// var data = { a: 1, b: 2 };

// var Hello = React.createClass({
//     render: function() {
//         return <div><pre>{JSON.stringify(data, null, 2) }</pre></div>;
//     }
// });

// React.render(<Hello />, document.getElementById('container'));
// // Working example.

// // Update

// class PrettyPrintJson extends React.Component {
//     render() {
//          // data could be a prop for example
//          // const { data } = this.props;
//          return (<div><pre>{JSON.stringify(data, null, 2) }</pre></div>);
//     }
// }

// ReactDOM.render(<PrettyPrintJson/>, document.getElementById('container'));
// Example

// Stateless Functional component, React .14 or higher

// const PrettyPrintJson = ({data}) => {
//     // (destructured) data could be a prop for example
//     return (<div><pre>{ JSON.stringify(data, null, 2) }</pre></div>);
// }
// Or, ...

// const PrettyPrintJson = ({ data }: any) => (
//   <div>
//     <pre>{JSON.stringify(data, null, 2)}</pre>
//   </div>
// );

// const PrettyPrintJson = React.memo(({data}) => (<div><pre>{
//     JSON.stringify(data, null, 2) }</pre></div>));
