import React, { SyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteRenderOptionState,
  FilterOptionsState,
  FormControl,
  TextField,
  InputBase,
  Select,
  MenuItem
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Label } from '../../UI';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 1rem 0;
  width: 10rem;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  justify-items: space-around;
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

export interface MessageSearchFieldConfig {
  label: string;
  options: MessageSearchOptions;
  onChange: (value: string) => void;
  filterOptions: (
    options: MessageSearchOptions[],
    state: FilterOptionsState<MessageSearchOptions>
  ) => MessageSearchOptions[];
  renderOption: (
    option: MessageSearchOptions,
    state: AutocompleteRenderOptionState
  ) => React.ReactNode;
  getOptionLabel?: (option: MessageSearchOptions) => string;
  getOptionSelected?: (
    option: MessageSearchOptions,
    value: MessageSearchOptions
  ) => boolean;
}

export function MessageSearchField<T>({
  label,
  options,
  onChange,
  filterOptions,
  renderOption
}: {
  label: string;
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
  const [searchType, setSearchType] = useState('from');
  const [searchTypeOptions, setSearchTypeOptions] = useState({
    from: 'From',
    to: 'To',
    subject: 'Subject',
    body: 'Body'
  } as Record<string, string>);

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

  const handleSearchTypeChange = (
    value: typeof searchTypeOptions[keyof typeof searchTypeOptions]
  ) => {
    if (typeof value === 'string') {
      setSearchType(value);
    }
  };

  return (
    <SearchContainer>
      <FormControl>
        <SelectContainer>
          <Label>{label} Search</Label>
          <Select
            size="small"
            style={{ width: '10rem' }}
            value={searchType}
            onChange={(event, newSearchType) => {
              handleSearchTypeChange(event.target.value as string);
            }}
            label="Table Type">
            {Object.keys(searchTypeOptions).map(type => (
              <MenuItem key={type} value={type}>
                {searchTypeOptions[type]}
              </MenuItem>
            ))}
          </Select>
        </SelectContainer>
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
          id={`search-${label}`}
          options={options}
          // getOptionLabel={getOptionLabel}
          renderOption={renderOption}
          style={{ width: 300 }}
          freeSolo
          renderInput={params => (
            <SearchTextField
              {...params}
              // label="Search"
              placeholder={`Search ${label}`}
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
