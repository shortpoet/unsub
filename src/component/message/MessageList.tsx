import React, { FC, useCallback, useEffect, useState } from 'react';
import { Container } from '@mui/material';

// import Page, { PageToolbar } from '../component/Page';
// import { TopBar } from '../component/UI';
import { SubTitle } from '../UI';
// import { Message } from '../model/Message';
import { IApiConfig } from '../../api/IApi';
import { MessageApi } from '../../api/MessageApi';

export function MessageList() {
  const [messages, setMessages] = useState([] as string[]);
  const [messageId, setMessageId] = useState('message_id');

  // useCheckAuthentication();

  // const fetchData = useCallback(async () => {
  //   const config: IApiConfig = {
  //     baseURL: 'http://localhost:3000',
  //     timeout: 10000
  //   };
  //   const api = new MessageApi(config);

  //   const response = await api.getMessages();
  //   const data = response.json();
  //   setMessages(data);
  // }, []);

  // useEffect(() => {
  //   fetchData().catch(error => {
  //     console.log('error', error);
  //   });
  // }, [fetchData]);

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

  // let messageList = [];
  // if (messages) {
  //   messageList = messages.map((message: any) => (
  //     <div key={message.id}>
  //       <h3>{message.title}</h3>
  //       <p>{message.content}</p>
  //     </div>
  //   ));

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
