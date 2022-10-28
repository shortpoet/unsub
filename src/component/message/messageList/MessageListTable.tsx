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
  // const [tableData, setTableData] = useState<MessageTableData[]>();
  const [selectedData, setSelectedData] = useState<MessageTableData[]>();
  const [error, setError] = useState(false);
  const [errorJson, setErrorJson] = useState('');

  useCheckAuthentication();

  const getTableData = useCallback(
    async (selectedTableType: any) => {
      const config: IApiConfig = {
        baseURL: 'http://localhost:3000',
        timeout: 10000
      };
      const api = new PuppeteerApi(config);
      const params = {
        gmailIds: [props.message.gmailId],
        elementType: selectedTableType
      };
      return api.getElements(params).then(response => {
        if (response.data) {
          const out = response.data[0].map(
            (element: MessageTableData, i: number) => {
              element['id'] = i;
              return element;
            }
          );
          return out;
        }
      });
    },
    [props.message.gmailId]
  );

  useEffect(() => {
    console.log('[useEffect to getTableData]', selectedTableType);
    getTableData(selectedTableType)
      .then(data => {
        // setTableData(data);
        setSelectedData(data);
      })
      .catch(error => {
        setError(true);
        setErrorJson(JSON.stringify(error));
      });
  }, [selectedTableType]);

  // const setData = (selection: string, data = tableData) =>
  //   setSelectedData(data);

  const _handleTableSelection = async (event: any) => {
    console.log('[handleTableSelection]', event);
    const selection = event.target.value;
    console.log('[handleTableSelection] selection', selection);
    await setSelectedTableType(selection);
    try {
      const data = await getTableData(selection);
      console.log('[handleTableSelection] data', data);
      setSelectedData(data);
    } catch (error) {
      setError(true);
      setErrorJson(JSON.stringify(error));
    }
  };

  const handleTableSelection = useCallback(_handleTableSelection, [
    selectedTableType
  ]);

  return (
    <TableContainer>
      <Section padding="0rem 0.5rem">
        <MessageListTableSelector
          title={TABLE_SELECTIONS['ELEMENT_TYPE'][selectedTableType].label}
          types={TABLE_SELECTIONS['ELEMENT_TYPE']}
          selectedType={selectedTableType}
          onChange={handleTableSelection}
        />
        {/* <MessageDomains /> */}
        {selectedData && (
          <Table
            data={selectedData}
            columns={TABLES['ELEMENT_TYPE']}
            rowsPerPage={5}
          />
        )}
      </Section>
    </TableContainer>
  );
}
