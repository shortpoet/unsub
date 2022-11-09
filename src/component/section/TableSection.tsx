import React, { useEffect, useState } from 'react';
import { Section, SectionTitle } from '../UI';
import { myPalette } from '../../Theme';
import { MessageSectionTypes } from '../section/MessageSection';
import { TABLES } from '../../@types';
import { MessageDomains } from '../message/MessageDomains';
import { GmailMessageDTO } from '../../@types/messageDTO';
import { IApiConfig } from '../../api/IApi';
import { MessageApi } from '../../api/MessageApi';
import { colorLog } from '../../util/colorLog';
import { Table } from '../table/Table';
import { StatusTableType, TableTypeSection } from '../table/TableTypeSection';
import TABLE_TYPES from '../../@types/TableSelections';
import { Container } from '@mui/material';
import styled from 'styled-components';

const TableContainer = styled(Container)`
  background-color: ${myPalette.page.lightGrey};
  scroll-behavior: smooth;
  padding: 2rem 0rem 5rem 0rem;
  margin: 0rem 0rem;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  overflow-y: scroll;
`;

export function TableSection() {
  const [messages, setMessages] = useState<GmailMessageDTO[]>([]);
  const [selectedTableType, setSelectedTableType] =
    useState<StatusTableType>('ALL');
  const [error, setError] = useState(false);
  const [errorJson, setErrorJson] = useState('');
  const [tableData, setTableData] = useState<GmailMessageDTO[]>([]);

  useEffect(() => {
    (async () => {
      const config: IApiConfig = {
        baseURL: 'http://localhost:3000',
        timeout: 10000
      };
      const api = new MessageApi(config);
      const params = {
        userId: 'me',
        // q: 'mous',
        fetchCount: 100
      };
      // const response = await api.getMessages(params);
      // const data = response.messages;
      try {
        colorLog('getting domains');
        const response = await api.getMessages(params);
        console.log(response);
        console.log(messages);
        // console.log(inspect(response, { depth: 5, colors: false }));
        if (response.data) {
          // setMessages(response.data);
          await setMessages(response.data);
          setTableData(messages);
        }
        if (response.error) {
          console.error(response.error);
          await setErrorJson(response.error);
          setError(true);
        }
      } catch (e) {
        console.error('[error]', e);
      }
    })();
  }, []);

  const handleTableTypeChange = (event: any) => {
    const value = event.props.value;
    console.log('[TableSection.handleTableTypeChange]', value);
    setSelectedTableType(value);
    setTableData(
      messages.filter(message => {
        return message.status === value;
      })
    );
  };

  return (
    <TableContainer maxWidth={false}>
      <Section padding="0rem 0.5rem">
        <TableTypeSection
          title={TABLE_TYPES['MESSAGE_TYPES'][selectedTableType].label}
          types={TABLE_TYPES['MESSAGE_TYPES']}
          selectedType={selectedTableType}
          onChange={handleTableTypeChange}
        />
        {/* <MessageDomains /> */}
        {tableData && <Table data={tableData} columns={TABLES['BASE']} />}
      </Section>
    </TableContainer>
  );
}
