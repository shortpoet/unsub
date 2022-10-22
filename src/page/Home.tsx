import React, { FC, useEffect, useState } from 'react';
import Page, { PageToolbar } from '../component/Page';
import { TopBar } from '../component/UI';

import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';

import { MessageApi } from '../api/MessageApi';
// import { Message } from '../model/Message';
import { IApiConfig } from '../api/IApi';
import { Input, SubTitle } from '../component/UI';

export interface Message {
  id: string;
}

// export const MessageJson: FC<Message[]> = ({ posts }) => {
//   return (
//     <div className="post-container">
//       {posts.map(post => (
//         <Post key={post._id} post={post} />
//       ))}
//     </div>
//   );
// };

export function Home() {
  const [showToolbar, setShowToolbar] = useState(false);
  // const [showSidebar, setShowSidebar] = useState(0);
  // const [showFooter, setShowFooter] = useState(1);
  // const [interval, setInterval] = useState('ALL');

  // const { messageId } = useParams<{ messageId: string }>();
  // const [message, setMessage] = useState(null);
  const [messages, setMessages] = useState([] as string[]);
  // const [messages, setMessages] = useState([] as Message[]);
  const [messageId, setMessageId] = useState('message_id');

  // useCheckAuthentication();

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch(`/api/message/${messageId}`);
  //     const data = await response.json();
  //     setMessage(data);
  //   })();
  // }, [messageId]);

  // const getData = async () => {
  //   const config: IApiConfig = {
  //     baseURL: 'http://localhost:3000',
  //     timeout: 10000
  //   };
  //   const api = new MessageApi(config);

  //   const response = await api.getMessages();
  //   const data = response.json();
  //   // setMessages(data);
  //   return data;
  // };

  // const data = await getData();

  // console.log('data', getData());
  // console.log('messages', messages);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // const data = await getData();
  //     const config: IApiConfig = {
  //       baseURL: 'http://localhost:3000',
  //       timeout: 10000
  //     };
  //     const api = new MessageApi(config);

  //     const response = await api.getMessages();
  //     const data = response.json();

  //     setMessages(data);
  //   };
  //   fetchData();
  // }, [messages]);

  // useEffect(() => {
  //   (async () => {
  //     const config: IApiConfig = {
  //       baseURL: 'http://localhost:3000',
  //       timeout: 10000
  //     };
  //     console.log('config', config);
  //     // const api = new MessageApi(config);

  //     // const response = await api.getMessages();
  //     // const data = response.json();
  //     // const data = ['test'];
  //     setMessages(data);
  //   })();
  // }, [messages]);

  // let messageList = [];
  // if (messages) {
  //   messageList = messages.map((message: any) => (
  //     <div key={message.id}>
  //       <h3>{message.title}</h3>
  //       <p>{message.content}</p>
  //     </div>
  //   ));
  console.log('messageID', messageId);

  const handleSelectedToolbar = (event: {
    target: { value: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setShowToolbar(event.target.value);
  };

  return (
    <Page title="Home" showToolbar={showToolbar}>
      <PageToolbar>
        <h1>Page toolbar</h1>
        <Container maxWidth="xl">
          <h1>Home Container</h1>
          <TopBar>
            <h1>TopBar</h1>
          </TopBar>
        </Container>
        <Container maxWidth="xl">
          <SubTitle>Message Id</SubTitle>
          <Input
            type="text"
            value={messageId}
            onChange={e => setMessageId(e.target.value)}
          />
        </Container>
        {/* <Container maxWidth="xl">
          <SubTitle>Message</SubTitle>
          <PrettyPrintJson data={messages} />
        </Container> */}
      </PageToolbar>
    </Page>
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

const PrettyPrintJson = ({ data }: any) => (
  <div>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

// const PrettyPrintJson = React.memo(({data}) => (<div><pre>{
//     JSON.stringify(data, null, 2) }</pre></div>));
