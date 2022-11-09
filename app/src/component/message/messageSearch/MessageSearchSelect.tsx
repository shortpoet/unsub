import React, { SyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteRenderOptionState,
  createFilterOptions,
  FilterOptionsState,
  FormControl,
  TextField
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Label } from '../../UI';
import { GmailMessageDTO } from '../../../@types/messageDTO';
import { MessageApi } from '../../../api/MessageApi';
import { MessageSearchField, MessageSearchOptions } from './MessageSearchField';

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

export function MessageSearchSelect({
  options,
  onChange
}: {
  // messages: GmailMessageDTO[];
  options: GmailMessageDTO[];
  // loading: boolean;
  onChange: ({
    filterOn,
    key
  }: {
    filterOn: string;
    key: keyof GmailMessageDTO | '';
  }) => void;
}) {
  const optionsByCount = (opts: string[]) =>
    opts
      .map((option: string, i: number) => {
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
  const unique = [...new Set(options)];
  const domainOptions = optionsByCount(options.map(option => option.domain));
  const idOptions = options.map(option => option.gmailId);

  function filterOptions(
    options: MessageSearchOptions[],
    state: FilterOptionsState<MessageSearchOptions>
  ) {
    const filtered = createFilterOptions({
      matchFrom: 'start',
      stringify: (option: MessageSearchOptions) => option.label
    })(options, state);
    // if (state.inputValue !== '') {
    //   filtered.push({
    //     inputValue: state.inputValue,
    //     label: `Add "${state.inputValue}"`,
    //     color: 'blue',
    //     id: options.length,
    //     count: 0
    //   });
    // }
    return filtered;
  }
  // function filterOptions(
  //   options: MessageSearchOptions[],
  //   state: FilterOptionsState<MessageSearchOptions>
  // ): MessageSearchOptions[] {
  //   return createFilterOptions({
  //     ignoreCase: true
  //   });
  // }
  function renderOption(
    props: React.HTMLAttributes<HTMLLIElement>,
    option: MessageSearchOptions,
    state: AutocompleteRenderOptionState
  ): React.ReactNode {
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

  const config = [
    {
      label: 'domain' as keyof GmailMessageDTO,
      options: domainOptions,
      onChange: onChange,
      filterOptions: filterOptions,
      renderOption: renderOption
    },
    {
      label: 'gmailId' as keyof GmailMessageDTO,
      options: idOptions,
      onChange: onChange,
      filterOptions: filterOptions,
      renderOption: renderOption
    }
  ];

  return <MessageSearchField config={config} />;
}
