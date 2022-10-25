import React, { FC, useCallback, useEffect, useState } from 'react';
import { Container } from '@mui/material';

// import Page, { PageToolbar } from '../component/Page';
// import { TopBar } from '../component/UI';
import { SubTitle } from '../UI';
// import { Message } from '../model/Message';
import { IApiConfig } from '../../api/IApi';
import { MessageApi } from '../../api/MessageApi';
import { GmailMessageDTO } from '../../types/messageDTO';
import { useCheckAuthentication } from '../../hook/AuthenticationHook';

export function MessageList() {
  const [messages, setMessages] = useState([] as string[]);
  // const [messageId, setMessageId] = useState('message_id');

  useCheckAuthentication();

  // const fetchData = useCallback(async () => {
  //   const config: IApiConfig = {
  //     baseURL: 'http://localhost:3000',
  //     timeout: 10000
  //   };
  //   const api = new MessageApi(config);

  //   const response = await api.getMessages();
  //   const data = response.messages;
  //   console.log('response', response);
  //   setMessages(data);
  // }, []);

  // useEffect(() => {
  //   fetchData().catch(error => {
  //     console.log('error', error);
  //   });
  // }, [fetchData]);
  useEffect((): any => {
    let isSubscribed = true;
    (async () => {
      const config: IApiConfig = {
        baseURL: 'http://localhost:3000',
        timeout: 10000
      };
      const api = new MessageApi(config);
      const params = {
        userId: 'me',
        q: 'google',
        fetchCount: 50
      };
      // const response = await api.getMessages();
      // const data = response.messages;
      const response = await api.getMessages(params);
      const data = response.dto;
      if (isSubscribed && data) {
        setMessages(data);
      }
    })();
    return () => (isSubscribed = false);
  }, []);

  let messageList: any = [];
  if (messages.length > 0) {
    messageList = messages.map((message: any) => (
      <div key={message.id}>
        <h3>{message.from}</h3>
        <p>{message.id}</p>
        {message.status === 'HAS_MAILTO' && <p>Has mailto</p>}
        <p>{message.status}</p>
        <p>{message.listUnsubscribe.trim()}</p>
        {/* <a href={message.listUnsubscribe.trim()}>{message.domain}</a> */}
      </div>
    ));
  }
  return (
    <Container maxWidth="lg">
      <SubTitle>Messages</SubTitle>
      {messageList}
    </Container>
  );
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
