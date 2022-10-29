import React, { SyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { GmailMessageDTO } from '../../types/messageDTO';
import { MessageSearchDomain } from './messageSearch/MessageSearchDomain';
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
    if (filterOn === '') {
      return messages;
    }
    return messages.filter(message => message.domain === filterOn);
  };
  const [value, setValue] = useState('');
  const [filteredMessages, setFilteredMessages] = useState<GmailMessageDTO[]>(
    filtered(value)
  );
  const onChange = (value: string) => {
    setValue(value);
    setFilteredMessages(filtered(value));
  };
  const options = messages.map(message => message.domain);
  const unique = [...new Set(options)];
  return (
    <SearchContainer>
      <MessageSearchDomain onChange={onChange} options={options} />
      <MessageSearchResults messages={filteredMessages} />
    </SearchContainer>
  );
}