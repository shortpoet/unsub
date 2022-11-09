import { useCallback, useEffect, useState } from 'react';
import { TableContainer } from '@mui/material';
import { Section } from '../../UI';
import { GmailMessageDTO } from '../../../@types/messageDTO';
import { useCheckAuthentication } from '../../../hook/AuthenticationHook';
import { Table } from '../../table/Table';
import { PuppeteerApi, PuppeteerParams } from '../../../api/PuppeteerApi';
import { IApiConfig } from '../../../api/IApi';
import {
  ElementTypes,
  MessageListTableSelector,
  TABLE_SELECTIONS
} from './MessageListTableSelector';
import TABLES from '../../table/Tables';
import { colorLog } from '../../../util/colorLog';

export type MessageTableData = {
  name: string;
  elementType: string;
  value: string;
  text: string;
  id: number;
};

export function MessageListTable(props: { message: GmailMessageDTO }) {
  const [selectedTableType, setSelectedTableType] =
    useState<ElementTypes>('input');
  const [tableData, setTableData] = useState<MessageTableData[]>();
  const [selectedData, setSelectedData] = useState();
  const [error, setError] = useState(false);
  const [errorJson, setErrorJson] = useState('');

  useCheckAuthentication();
  // const handlePuppeteerClick = async () => {
  //   if (message.status === 'HAS_MAILTO') {
  //     console.log('message has mailto', message.mailto);
  //   }
  //   await getPuppeteerElements({
  //     gmailIds: [message.gmailId],
  //     elementType: 'input'
  //   });
  // };

  const getTableData = useCallback(async () => {
    const config: IApiConfig = {
      baseURL: 'http://localhost:3000',
      timeout: 10000
    };
    const api = new PuppeteerApi(config);
    try {
      const params = {
        gmailIds: [props.message.gmailId],
        elementType: selectedTableType
      };
      const response = await api.getElements(params);
      if (response.data) {
        const out = response.data[0].map(
          (element: MessageTableData, i: number) => {
            element['id'] = i;
            return element;
          }
        );
        colorLog('setting table data');
        setTableData(out);
      }
      if (response.error) {
        console.error(response.error);
        setError(true);
        setErrorJson(response.error);
      }
    } catch (e) {
      console.error('[error]', e);
    }
  }, [props.message.gmailId, selectedTableType]);

  useEffect(() => {
    getTableData();
  }, [selectedTableType, props.message.gmailId]);

  const handleTableTypeChange = useCallback(
    async (event: any) => {
      const value = event.props.value;
      setSelectedTableType(value);
      // getTableData();
    },
    [selectedTableType, props.message.gmailId, tableData]
  );
  return (
    <TableContainer>
      <Section padding="0rem 0.5rem">
        <MessageListTableSelector
          title={TABLE_SELECTIONS['ELEMENT_TYPE'][selectedTableType].label}
          types={TABLE_SELECTIONS['ELEMENT_TYPE']}
          selectedType={selectedTableType}
          onChange={handleTableTypeChange}
        />
        {/* <MessageDomains /> */}
        {tableData && (
          <Table data={tableData} columns={TABLES['ELEMENT_TYPE']} />
        )}
      </Section>
    </TableContainer>
  );
}
