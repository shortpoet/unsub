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
import { GmailMessageDTO } from '../../../@types/messageDTO';

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
  inputValue: string;
}

export interface MessageSearchFieldConfig {
  label: keyof GmailMessageDTO;
  options: MessageSearchOptions[];
  onChange: ({
    filterOn,
    key
  }: {
    filterOn: string;
    key: keyof GmailMessageDTO | '';
  }) => void;
  filterOptions: (
    options: MessageSearchOptions[],
    state: FilterOptionsState<MessageSearchOptions>
  ) => MessageSearchOptions[];
  renderOption: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: MessageSearchOptions,
    state: AutocompleteRenderOptionState
  ) => React.ReactNode;
  getOptionLabel?: (option: MessageSearchOptions) => string;
  getOptionSelected?: (
    option: MessageSearchOptions,
    value: MessageSearchOptions
  ) => boolean;
}

export function MessageSearchField(props: {
  config: MessageSearchFieldConfig[];
}) {
  const { config } = props;
  const [searchType, setSearchType] = useState(config[0].label);
  const [searchTypeOptions, setSearchTypeOptions] = useState(
    config.map(c => c.label)
  );
  const thisConfig = config.find(
    c => c.label === searchType
  ) as MessageSearchFieldConfig;

  const {
    label,
    options,
    onChange,
    filterOptions,
    renderOption,
    getOptionLabel,
    getOptionSelected
  } = thisConfig;

  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  // const { label, color } = options;
  const [open, setOpen] = useState(false);
  const loading = open && options?.length === 0;

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: unknown,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<unknown> | undefined
  ) => {
    console.log('selected', value);
    if (typeof value === 'string') {
      setValue(value);
      onChange({
        filterOn: value,
        key: searchType
      });
      // window.open(`https://mail.google.com/mail/u/0/#search/${value}`, '_blank');
    }
    if (value) {
      if ((value as MessageSearchOptions).label) {
        const { label, color, id, count } = value as MessageSearchOptions;
        setValue(label);
        onChange({
          filterOn: label,
          key: searchType
        });
      }
    }
    if (value === null) {
      setValue('');
      onChange({
        filterOn: '',
        key: ''
      });
    }
  };
  const handleTextChange = async (event: SyntheticEvent<Element, Event>) => {
    const term = event.target;
    if (term instanceof HTMLInputElement) {
      // console.log('[MessageSearchField.handleTextChange] term: ', term.value);
      const value = term.value;
      // const messages = await MessageApi // or onChange
      setValue(value);
      onChange({
        filterOn: value,
        key: searchType
      });
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
              handleSearchTypeChange(
                event.target.value as keyof GmailMessageDTO
              );
            }}
            label="Table Type">
            {searchTypeOptions.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
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
