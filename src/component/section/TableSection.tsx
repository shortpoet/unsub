import React, { useEffect, useState } from 'react';
import { Section, SectionTitle } from '../UI';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { myPalette } from '../../Theme';
import { MessageSectionTypes } from '../section/MessageSection';
import { TABLES } from '../../types';
import { MessageDomains } from '../message/MessageDomains';
import { GmailMessageDTO } from '../../types/messageDTO';
import { IApiConfig } from '../../api/IApi';
import { MessageApi } from '../../api/MessageApi';

export function TableSection() {
  const [messages, setMessages] = useState<GmailMessageDTO[]>([]);
  const [error, setError] = useState(false);
  const [errorJson, setErrorJson] = useState('');
  const [tableData, setTableData] = useState<Record<string, number>>({});

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
        source: 'gmail'
      };
      // const response = await api.getMessages(params);
      // const data = response.messages;
      try {
        const response = await api.getDomains(params);
        console.log(response);
        // console.log(inspect(response, { depth: 5, colors: false }));
        if (response.data) {
          setMessages(response.data);
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

  return (
    <Section>
      <SectionTitle>Table</SectionTitle>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Domain</TableCell>
              <TableCell>Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(tableData).map(domain => (
              <TableRow key={domain}>
                <TableCell>{domain}</TableCell>
                <TableCell>{tableData[domain]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Section>
  );
}
