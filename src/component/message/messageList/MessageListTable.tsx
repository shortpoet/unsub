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
import { Loading } from '../../Utils';

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
  const [selectedData, setSelectedData] = useState<MessageTableData[]>([]);
  const [error, setError] = useState(false);
  const [errorJson, setErrorJson] = useState('');
  const [columns, setColumns] = useState<any[]>([]);

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
    getTableData(selectedTableType)
      .then(data => {
        const allCols = data.reduce((acc: any, curr: any) => {
          return { ...acc, ...curr };
        }, {});
        setColumns(makeColumns(Object.keys(allCols)));
        setSelectedData(data);
      })
      .catch(error => {
        setError(true);
        setErrorJson(JSON.stringify(error));
      });
  }, []);

  const _handleTableSelection = async (event: any) => {
    const selection = event.target.value;
    try {
      setSelectedData([]);
      await setSelectedTableType(selection);
      let data = await getTableData(selection);
      if (data && data.length === 0) {
        data = [
          {
            id: `${selection}-NO_DATA`,
            NO_DATA: `${selection}-NO_DATA`
          }
        ];
      }
      const allCols = data.reduce((acc: any, curr: any) => {
        return { ...acc, ...curr };
      }, {});
      delete allCols.id;

      setColumns(makeColumns(Object.keys(allCols)));

      setSelectedData([]);
      setSelectedData(data);
    } catch (error) {
      setError(true);
      setErrorJson(JSON.stringify(error));
    }
  };

  const makeColumns = (columns: string[]) => {
    return columns.map((col: string) => {
      return {
        field: col,
        headerName: col,
        flex: 1
      };
    });
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
        {(selectedData?.length > 0 && (
          <Table
            data={selectedData}
            columns={columns}
            // columns={TABLES['ELEMENT_TYPE']}
            rowsPerPage={5}
          />
        )) || <Loading />}
      </Section>
    </TableContainer>
  );
}
