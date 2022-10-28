import { useCallback, useState } from 'react';
import { Box, TableContainer } from '@mui/material';

import { SubTitle, Label, Section } from '../../UI';
import { GmailMessageDTO } from '../../../types/messageDTO';
import { useCheckAuthentication } from '../../../hook/AuthenticationHook';
import { myPalette } from '../../../Theme';
import styled from 'styled-components';
import { Table } from '../../table/Table';
import TABLES from '../../table/Tables';
import { PuppeteerApi, PuppeteerParams } from '../../../api/PuppeteerApi';
import { IApiConfig } from '../../../api/IApi';
import { TableTypeSection } from '../../table/TableTypeSection';
import TABLE_TYPES from '../../../types/TableSelections';

export type MessageTableData = {
  name: string;
  elementType: string;
  value: string;
  text: string;
};

export type ElementTypes =
  | 'input'
  | 'button'
  | 'select'
  | 'textarea'
  | 'checkbox'
  | 'radio'
  | 'label';

const MessagePuppeteerElementsTable = (props: {
  tableData: MessageTableData;
}) => {
  return (
    <TableContainer>
      <Section padding="0rem 0.5rem">
        {/* <TableTypeSection
          title={TABLE_TYPES['MESSAGE_TYPES'][selectedTableType].label}
          types={TABLE_TYPES['MESSAGE_TYPES']}
          selectedType={selectedTableType}
          onChange={handleTableTypeChange}
        /> */}
        {/* <MessageDomains /> */}
        {props.tableData && (
          <Table data={props.tableData} columns={TABLES['ELEMENT_TYPE']} />
        )}
      </Section>
    </TableContainer>
  );
};

export function MessageListTable(props: { message: GmailMessageDTO }) {
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
  const getPuppeteerElements = useCallback(async (params: PuppeteerParams) => {
    const config: IApiConfig = {
      baseURL: 'http://localhost:3000',
      timeout: 10000
    };
    const api = new PuppeteerApi(config);
    const response = await api.getElements(params);
    console.log('getPuppeteerElements - response', response);
  }, []);

  return (
    <MessagePuppeteerElementsTable
      tableData={{
        name: 'test',
        elementType: 'input',
        value: 'test',
        text: 'test'
      }}
    />
  );
}
