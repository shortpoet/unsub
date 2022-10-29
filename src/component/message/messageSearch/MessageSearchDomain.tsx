import React, { SyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteRenderOptionState,
  createFilterOptions,
  FormControl,
  TextField
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Label } from '../../UI';
import { GmailMessageDTO } from '../../../types/messageDTO';
import { MessageApi } from '../../../api/MessageApi';
import { MessageSearchField } from './MessageSearchField';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 1rem 0;
  width: 10rem;
`;

const SearchTextField = styled(TextField)`
  width: 100%;
  && {
    margin: 0 0.5rem 0 0;
    background-color: #fff;
  }
`;

export interface MessageSearchOptions {
  label: string;
  color: string;
  id: number;
  count: number;
}
export function MessageSearchDomain({
  options,
  onChange
}: {
  // messages: GmailMessageDTO[];
  options: any;
  // loading: boolean;
  onChange: (value: string) => void;
}) {
  options = options
    .map((option: any, i: number) => {
      return {
        label: option,
        color: 'blue',
        id: i
      };
    })
    .reduce((acc: any, current: any) => {
      const unique = acc.find((item: any) => item.label === current.label);
      if (!unique) {
        return acc.concat([{ ...current, count: 1 }]);
      } else {
        unique.count += 1;
        unique.color = 'red';
        return acc;
      }
    }, []);

  const filterOptions = createFilterOptions({
    ignoreCase: true
  });

  function renderOption(
    props: any,
    option: any,
    state: AutocompleteRenderOptionState
  ) {
    // console.log('[MessageSearch - renderOption] option: ', option);
    if (typeof option === 'string') {
      return (
        <li {...props}>
          <Label color="red">{option}</Label>
        </li>
      );
    }
    if ((option as MessageSearchOptions).label) {
      const { label, color, id, count } = option as MessageSearchOptions;
      return (
        <li {...props} key={id}>
          <Label style={{ color: color }}>{`${label} (${count})`}</Label>
        </li>
      );
    }
  }

  return (
    <MessageSearchField<MessageSearchOptions>
      options={options}
      onChange={onChange}
      filterOptions={filterOptions}
      renderOption={renderOption}
    />
  );
}
