import styled from 'styled-components';
import { GmailMessageDTO } from '../../../@types/messageDTO';
import { PrettyPrintJson } from '../../Utils';

const SearchContainer = styled.div``;

export function MessageSearchResults({
  messages
}: {
  messages: GmailMessageDTO[];
}) {
  return (
    <SearchContainer>
      <PrettyPrintJson data={messages} />
    </SearchContainer>
  );
}
