import { useCallback, useEffect, useState } from 'react';
import { TableContainer } from '@mui/material';
import { Section } from '../../UI';
import { GmailMessageDTO } from '../../../types/messageDTO';
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

  useEffect(() => {
    (async () => {
      const config: IApiConfig = {
        baseURL: 'http://localhost:3000',
        timeout: 10000
      };
      const api = new PuppeteerApi(config);
      // const response = await api.getMessages(params);
      // const data = response.messages;
      try {
        const params = {
          gmailIds: [props.message.gmailId],
          elementType: selectedTableType
        };
        const response = await api.getElements(params);
        console.log('getPuppeteerElements - response', response);

        const out = response.data[0].map(
          (element: MessageTableData, i: number) => {
            element['id'] = i;
            console.log('element', element);
            return element;
          }
        );
        console.log(response);
        console.log(out);
        // console.log(inspect(response, { depth: 5, colors: false }));
        if (response.data) {
          // setMessages(response.data);
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
    })();
  }, []);

  // const getPuppeteerElements = useCallback(
  //   async (params: PuppeteerParams) => {
  //     const config: IApiConfig = {
  //       baseURL: 'http://localhost:3000',
  //       timeout: 10000
  //     };
  //     const api = new PuppeteerApi(config);
  //     const response = await api.getElements(params);
  //     console.log('getPuppeteerElements - response', response);

  //     const out = response.data.map((element: MessageTableData, i: number) => {
  //       return {
  //         ...element,
  //         id: i
  //       };
  //     });
  //     // const out = response.data.map((element: MessageTableData, i: number) => ({
  //     //   ...element,
  //     //   id: i
  //     // }));
  //     console.log('getPuppeteerElements - out', out);

  //     setTableData(out);
  //   },
  //   [tableData]
  // );

  // useEffect(() => {
  //   if (props.message.gmailId) {
  //     getPuppeteerElements({
  //       gmailIds: [props.message.gmailId],
  //       elementType: selectedTableType
  //     });
  //   }
  // }, [props.message.gmailId, selectedTableType]);

  const handleTableTypeChange = (event: any) => {
    const value = event.props.value;
    setSelectedTableType(value);
  };

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
