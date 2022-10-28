import React, { useEffect, useState } from 'react';
import { Section, SectionTitle } from '../UI';
import { myPalette } from '../../Theme';
import { MessageSectionTypes } from '../section/MessageSection';
import { TABLES } from '../../types';
import { MessageDomains } from '../message/MessageDomains';
import { GmailMessageDTO } from '../../types/messageDTO';
import { IApiConfig } from '../../api/IApi';
import { MessageApi } from '../../api/MessageApi';
import { colorLog } from '../../util/colorLog';
import { Table } from '../table/Table';
import { StatusTableType, TableTypeSection } from '../table/TableTypeSection';
import TABLE_TYPES from '../../types/TableSelections';
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
    useState<StatusTableType>('HAS_DATA');
  const [error, setError] = useState(false);
  const [errorJson, setErrorJson] = useState('');
  const [tableData, setTableData] = useState();

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
          setTableData(response.data);
        }
        if (response.error) {
          console.error(response.error);
          setError(true);
          setErrorJson(response.error);
        }
      } catch (e) {
        console.error('[error]', e);
      }
    })();
  }, []);

  const handleTableTypeChange = (event: any) => {
    const value = event.props.value;
    setSelectedTableType(value);
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
