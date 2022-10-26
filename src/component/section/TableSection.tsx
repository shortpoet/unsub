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
import { Table } from '../Table';
import { TableType, TableTypeSection } from '../table/TableTypeSection';
import MESSAGE_TYPES from '../../types/MessageTypes';

export function TableSection(props: { messages: GmailMessageDTO[] }) {
  const [messages, setMessages] = useState<GmailMessageDTO[]>([]);
  const [selectedTableType, setSelectedTableType] =
    useState<TableType>('HAS_DATA');
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
        fetchCount: 100,
        source: 'google'
      };
      // const response = await api.getMessages(params);
      // const data = response.messages;
      try {
        colorLog('getting domains');
        const response = await api.getDomains(params);
        console.log(response);
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
    setSelectedTableType(event.target.value);
  };

  return (
    <Section>
      <SectionTitle>Table</SectionTitle>
      <TableTypeSection
        title={MESSAGE_TYPES[selectedTableType].label}
        types={MESSAGE_TYPES}
        selectedType={selectedTableType}
        onChange={handleTableTypeChange}
      />
      {/* <MessageDomains messages={messages} />
      <Table data={messages} columns={TABLES[]}/> */}
    </Section>
  );
}
