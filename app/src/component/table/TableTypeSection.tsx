import React from 'react';
import { Section, SectionContent, Title } from '../UI';
import { MenuItem, Select } from '@mui/material';
import { GmailMessageDTO } from '../../@types/messageDTO';
import TABLE_TYPES from '../../@types/TableSelections';
import { theme } from '../../Theme';

export type StatusTableType =
  | 'HAS_UNSUB_LINK'
  | 'HAS_BOTH'
  | 'HAS_MAILTO'
  | '--> HAS_MANY_LINKS <--'
  | 'HAS_DATA'
  | 'ALL';

export function TableTypeSection(props: {
  title: string;
  types: typeof TABLE_TYPES['MESSAGE_TYPES'];
  selectedType: StatusTableType;
  onChange: (value: StatusTableType) => void;
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
            onChange(newTableType as StatusTableType);
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
