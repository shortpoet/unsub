import React from 'react';
import { Section, SectionContent, Title } from '../UI';
import { MenuItem, Select } from '@mui/material';
import { GmailMessageDTO } from '../../types/messageDTO';
import MESSAGE_TYPES from '../../types/MessageTypes';
import { theme } from '../../Theme';

export type TableType =
  | 'HAS_UNSUB_LINK'
  | 'HAS_MAILTO'
  | '--> HAS_MANY_LINKS <--'
  | 'HAS_DATA';

export function TableTypeSection(props: {
  title: string;
  types: typeof MESSAGE_TYPES;
  selectedType: TableType;
  onChange: (value: TableType) => void;
}) {
  const { title, selectedType, onChange, types } = props;
  return (
    <Section padding="1rem">
      <SectionContent justify="space-between" theme={theme}>
        <Title>{title}</Title>
        <Select
          size="small"
          style={{ width: '10rem' }}
          value={selectedType}
          onChange={(event, newTableType) => {
            onChange(newTableType as TableType);
          }}
          label="Table Type">
          {Object.keys(types).map(type => (
            <MenuItem key={type} value={type}>
              {types[type].label}
            </MenuItem>
          ))}
        </Select>
      </SectionContent>
    </Section>
  );
}
