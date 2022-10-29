import { useState } from 'react';
import styled from 'styled-components';
import { GmailMessageDTO } from '../../../types/messageDTO';
import { PrettyPrintJson } from '../../Utils';

const SearchContainer = styled.div``;

// const SearchContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 0 0 1rem 0;
//   width: 13rem;
// `;

export function MessageSearchResults({
  messages
}: {
  messages: GmailMessageDTO[];
}) {
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const onChange = (value: string) => {
    setValue(value);
    console.log('[MessageSearch - onChange] value: ', value);
  };
  const options = messages.map(message => message.domain);
  const unique = [...new Set(options)];
  return (
    <SearchContainer>
      <PrettyPrintJson data={messages} />
    </SearchContainer>
  );
}
