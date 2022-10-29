import React, { SyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { GmailMessageDTO } from '../../types/messageDTO';
import { MessageSearchField } from './messageSearch/MessageSearchField';
import { MessageSearchResults } from './messageSearch/MessageSearchResults';

const SearchContainer = styled.div``;

// const SearchContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 0 0 1rem 0;
//   width: 13rem;
// `;

export function MessageSearch({ messages }: { messages: GmailMessageDTO[] }) {
  const filtered = (filterOn: string) => {
    if (filterOn === 'all') {
      return messages;
    }
    console.log('[MessageSearch - filtered] filterOn: ', filterOn);
    return messages.filter(message => message.domain === filterOn);
  };
  const [value, setValue] = useState('all');
  const [filteredMessages, setFilteredMessages] = useState<GmailMessageDTO[]>(
    filtered(value)
  );
  const onChange = (value: string) => {
    setValue(value);
    setFilteredMessages(filtered(value));
    // console.log('[MessageSearch - onChange] value: ', value);
  };
  // useEffect(() => {
  //   console.log('[MessageSearch - useEffect] value: ', value);
  // }, [value, filtered]);
  const options = messages.map(message => message.domain);
  const unique = [...new Set(options)];
  return (
    <SearchContainer>
      <MessageSearchField onChange={onChange} options={options} />
      <MessageSearchResults messages={filteredMessages} />
    </SearchContainer>
  );
}
