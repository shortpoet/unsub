import { useState } from 'react';
import { GmailMessageDTO } from '../../../@types/messageDTO';

export function MessageListIFrame(props: { message: GmailMessageDTO }) {
  const { message } = props;
  return (
    <iframe
      src={message.listUnsubscribe}
      width="100%"
      height="100%"
      // https://blog.bitsrc.io/best-practices-in-using-iframes-with-react-6193feaa1e08
      sandbox=""
    />
  );
}
