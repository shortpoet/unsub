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
import { GmailMessageDTO } from '../../../types/messageDTO';
import { MessageApi } from '../../../api/MessageApi';

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
export function MessageSearchField<T>({
  options,
  onChange,
  filterOptions,
  renderOption
}: {
  // messages: GmailMessageDTO[];
  options: T[];
  // loading: boolean;
  onChange: (value: string) => void;
  filterOptions: (
    options: unknown[],
    state: FilterOptionsState<unknown>
  ) => unknown[];
  renderOption: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: unknown,
    state: AutocompleteRenderOptionState
  ) => JSX.Element | undefined;
}) {
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  // const { label, color } = options;
  const [open, setOpen] = useState(false);
  const loading = open && options.length === 0;

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: unknown,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<unknown> | undefined
  ) => {
    console.log('selected', value);
    if (typeof value === 'string') {
      setValue(value);
      onChange(value);
      // window.open(`https://mail.google.com/mail/u/0/#search/${value}`, '_blank');
    }
    if (value) {
      if ((value as MessageSearchOptions).label) {
        const { label, color, id, count } = value as MessageSearchOptions;
        setValue(label);
        onChange(label);
      }
    }
    if (value === null) {
      setValue('');
      onChange('');
    }
  };
  const handleTextChange = async (event: SyntheticEvent<Element, Event>) => {
    const term = event.target;
    if (term instanceof HTMLInputElement) {
      // console.log('[MessageSearchField.handleTextChange] term: ', term.value);
      const value = term.value;
      // const messages = await MessageApi // or onChange
      setValue(value);
      onChange(value);
    }
  };

  return (
    <SearchContainer>
      <FormControl>
        <Label>Search</Label>
        <Autocomplete
          value={value}
          onChange={handleChange}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          filterOptions={filterOptions}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          id="search"
          options={options}
          // getOptionLabel={getOptionLabel}
          renderOption={renderOption}
          style={{ width: 300 }}
          freeSolo
          renderInput={params => (
            <SearchTextField
              {...params}
              label="Search"
              placeholder="Message Search"
              onChange={handleTextChange}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <FontAwesomeIcon icon={faSpinner} spin />
                    ) : (
                      <FontAwesomeIcon icon={faSearch} />
                    )}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )}
        />
      </FormControl>
    </SearchContainer>
  );
}
