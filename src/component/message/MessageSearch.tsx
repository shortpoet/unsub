import React, { SyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { GmailMessageDTO } from '../../@types/messageDTO';
import { MessageSearchSelect } from './messageSearch/MessageSearchSelect';
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
  function filtered({
    filterOn,
    key
  }: {
    // messages: GmailMessageDTO[];
    filterOn: string;
    // loading: boolean;
    key: keyof GmailMessageDTO | '';
  }) {
    if (filterOn === '' || key === '') {
      return messages;
    }
    console.log('filterOn', filterOn);
    console.log('key', key);
    return messages.filter(message => message[key] === filterOn);
  }
  const [filter, setFilter] = useState({
    filterOn: '',
    key: 'from' as keyof GmailMessageDTO | ''
  });
  const [filteredMessages, setFilteredMessages] = useState<GmailMessageDTO[]>(
    filtered(filter)
  );
  const onChange = ({
    filterOn,
    key
  }: {
    filterOn: string;
    key: keyof GmailMessageDTO | '';
  }) => {
    setFilter({ filterOn, key });
    setFilteredMessages(filtered({ filterOn, key }));
  };
  return (
    <SearchContainer>
      <MessageSearchSelect onChange={onChange} options={messages} />
      <MessageSearchResults messages={filteredMessages} />
    </SearchContainer>
  );
}
