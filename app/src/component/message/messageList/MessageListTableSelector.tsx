import React from 'react';
import { Section, SectionContent, Title } from '../../UI';
import { MenuItem, Select } from '@mui/material';
import { theme } from '../../../Theme';

export type ElementTypes =
  | 'input'
  | 'button'
  | 'select'
  | 'textarea'
  | 'checkbox'
  | 'radio'
  | 'label';

export const TABLE_SELECTIONS: Record<
  string,
  Record<string, Record<string, string>>
> = {
  ELEMENT_TYPE: {
    input: { value: 'input', label: 'Input' },
    button: { value: 'button', label: 'Button' },
    select: { value: 'select', label: 'Select' },
    textarea: { value: 'textarea', label: 'Textarea' },
    checkbox: { value: 'checkbox', label: 'Checkbox' },
    radio: { value: 'radio', label: 'Radio' },
    label: { value: 'label', label: 'Label' }
  }
};

export function MessageListTableSelector(props: {
  title: string;
  types: typeof TABLE_SELECTIONS['ELEMENT_TYPE'];
  selectedType: ElementTypes;
  onChange: (event: any) => void;
  // onChange: (value: ElementTypes) => void;
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
          onChange={props.onChange}
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
